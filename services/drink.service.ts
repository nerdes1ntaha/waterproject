import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Drink } from "../entities/drink.entity";
import { ObjectId } from "mongodb";

export const createDrink = async (req: Request, res: Response) => {
  try {
    const { drinkType, waterRatio, drinkIcon, color } = req.body;

    const drinkRepository = AppDataSource.getRepository(Drink);
    const newDrink = drinkRepository.create({
      drinkType,
      waterRatio,
      drinkIcon,
      color,
    });

    await drinkRepository.save(newDrink);
    return res.status(201).json(newDrink);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const getAllDrinks = async (req: Request, res: Response) => {
  try {
    const drinkRepository = AppDataSource.getRepository(Drink);
    const drinks = await drinkRepository.find();
    return res.status(200).json(drinks);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const updateDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { drinkType, waterRatio, drinkIcon, color } = req.body;

    const drinkRepository = AppDataSource.getRepository(Drink);
    const drink = await drinkRepository.findOneBy({ id: new ObjectId(id) });

    if (!drink) {
      return res.status(404).json({ message: "İçecek bulunamadı" });
    }

    drink.drinkType = drinkType;
    drink.waterRatio = waterRatio;
    drink.drinkIcon = drinkIcon;
    drink.color = color;

    await drinkRepository.save(drink);
    return res.status(200).json(drink);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const deleteDrink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const drinkRepository = AppDataSource.getRepository(Drink);
    const drink = await drinkRepository.findOneBy({ id: new ObjectId(id) });

    if (!drink) {
      return res.status(404).json({ message: "İçecek bulunamadı" });
    }

    await drinkRepository.remove(drink);
    return res.status(200).json({ message: "İçecek başarıyla silindi" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};


