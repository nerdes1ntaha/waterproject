import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { userDrink } from "../entities/userDrink.entity";
import { User } from "../entities/user.entity";
import { ObjectId } from "mongodb";


export const createUserDrink = async (req: Request, res: Response) => {
  try {
    const { userId, amount, dateTime } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const drinkRepository = AppDataSource.getRepository(userDrink);

    // Kullanıcıyı kontrol et
    const user = await userRepository.findOneBy({ id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Yeni userDrink kaydı oluştur
    const newUserDrink = drinkRepository.create({
      user,
      amount,
      dateTime,
    });

    await drinkRepository.save(newUserDrink);
    return res.status(201).json(newUserDrink);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getUserDrinks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const drinkRepository = AppDataSource.getRepository(userDrink);
    const drinks = await drinkRepository.find({
      where: { user: { id: new ObjectId(userId) } }, 
    });

    if (!drinks || drinks.length === 0) {
      return res.status(404).json({ message: "İçecek kaydı bulunamadı" });
    }

    return res.status(200).json(drinks);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getUserDrinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const drinkRepository = AppDataSource.getRepository(userDrink);
    const drink = await drinkRepository.findOneBy({ id: new ObjectId(id) });

    if (!drink) {
      return res.status(404).json({ message: "İçecek kaydı bulunamadı" });
    }

    return res.status(200).json(drink);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, dateTime } = req.body;

    const drinkRepository = AppDataSource.getRepository(userDrink);
    const drink = await drinkRepository.findOneBy({ id: new ObjectId(id) });

    if (!drink) {
      return res.status(404).json({ message: "İçecek kaydı bulunamadı" });
    }

    drink.amount = amount;
    drink.dateTime = dateTime;

    await drinkRepository.save(drink);
    return res.status(200).json(drink);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUserDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const drinkRepository = AppDataSource.getRepository(userDrink);
    const drink = await drinkRepository.findOneBy({ id: new ObjectId(id) });

    if (!drink) {
      return res.status(404).json({ message: "İçecek kaydı bulunamadı" });
    }

    await drinkRepository.remove(drink);
    return res.status(200).json({ message: "İçecek kaydı başarıyla silindi" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};
