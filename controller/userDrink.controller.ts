import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserDrink } from "../entities/userDrink.entity";
import { User } from "../entities/user.entity";

export const createUserDrink = async (req: Request, res: Response) => {
  try {
    const { userId, amount, dateTime } = req.body;

    const userRepository = AppDataSource.getMongoRepository(User);
    const user = await userRepository.findOneBy({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const userDrinkRepository = AppDataSource.getMongoRepository(UserDrink);
    const newUserDrink = userDrinkRepository.create({
      user,
      amount,
      dateTime: new Date(dateTime),
    });

    const result = await userDrinkRepository.save(newUserDrink);
    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "İçecek oluşturulurken hata meydana geldi", error });
  }
};

export const getUserDrinks = async (req: Request, res: Response) => {
  try {
    const userDrinkRepository = AppDataSource.getMongoRepository(UserDrink);
    const drinks = await userDrinkRepository.find();
    return res.status(200).json(drinks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user drinks", error });
  }
};

export const getUserDrinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDrinkRepository = AppDataSource.getMongoRepository(UserDrink);
    const drink = await userDrinkRepository.findOne(id);

    if (!drink) {
      return res.status(404).json({ message: "Kullanıcı içeceği bulunamadı" });
    }

    return res.status(200).json(drink);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user drink", error });
  }
};

export const updateUserDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, dateTime } = req.body;

    const userDrinkRepository = AppDataSource.getMongoRepository(UserDrink);
    const drink = await userDrinkRepository.findOne(id);

    if (!drink) {
      return res.status(404).json({ message: "Kullanıcı içeceği bulunamadı" });
    }

    drink.amount = amount;
    drink.dateTime = new Date(dateTime);

    const result = await userDrinkRepository.save(drink);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Kullanıcı içeceğini güncellerken hata meydana geldi", error });
  }
};

export const deleteUserDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDrinkRepository = AppDataSource.getMongoRepository(UserDrink);
    const drink = await userDrinkRepository.findOne(id);
    if (!drink) {
      return res.status(404).json({ message: "Kullanıcı içeceği bulunamadı" });
    }

    await userDrinkRepository.delete(id);
    return res.status(200).json({ message: "İçecek başarıyla silindi" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "İçecek silinirken hata oluştu", error });
  }
};
