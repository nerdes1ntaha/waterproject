import { Request } from "express";
import { User } from "../entities/user.entity"; 
import { AppDataSource } from "../config/data-source";
// import { utils } from "../utils/helper"; 

export const createUser = async (userName: string, email: string, password: string) => {
    const userRepository = AppDataSource.getMongoRepository(User);
    const newUser = userRepository.create({ userName, email, password });
    return await userRepository.save(newUser);
};


export const getAllUsers = async () => {
  const userRepository = AppDataSource.getMongoRepository(User);
  return await userRepository.find();
};


interface RegisterResponse {
  token: string;
  user: User;
}

export const register = async (req: Request): Promise<RegisterResponse> => {
    try {
      let { userName, email, password, age, gender, weight, height } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      
      const existUser = await userRepository.findOne({ where: { email: email } });
      if (existUser) {
        throw new Error("Bu email adresi ile kayıtlı kullanıcı bulunmaktadır.");
      }
  
      const _password = hashToPassword(password);
      const user = userRepository.create({ userName, email, password: _password, gender, weight, height, age });
  
      await userRepository.save(user);
      
      const token = utils.helper.createToken(user.id, user.userName, user.email);
  
      // Telegram ile ilgili kısmı kaldırdık
      return { token, user }; // telegramResult artık yok
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  function hashToPassword(_password: any) {
      throw new Error("Function not implemented.");
  }