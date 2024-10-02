import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { ObjectId } from "mongodb";

// Create a new User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, gender, weight, height, target, premiumAccount, age } = req.body;

        const userRepository = AppDataSource.getMongoRepository(User);

        // Kullanıcı e-posta ile zaten kayıtlı mı kontrol et
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email zaten kullanılıyor" });
        }

        const newUser = userRepository.create({
            userName,
            email,
            password,
            gender,
            weight,
            height,
            target,
            premiumAccount,
            age
        });

        const result = await userRepository.save(newUser);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Kullanıcı oluşturulamadı", error });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getMongoRepository(User);
        const users = await userRepository.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get a specific user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getMongoRepository(User);

        const user = await userRepository.findOneBy({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userName, email, password, gender, weight, height, target, premiumAccount, age } = req.body;

        const userRepository = AppDataSource.getMongoRepository(User);

        const user = await userRepository.findOneBy({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        // Güncelleme işlemi
        user.userName = userName ?? user.userName;
        user.email = email ?? user.email;
        user.password = password ?? user.password;
        user.gender = gender ?? user.gender;
        user.weight = weight ?? user.weight;
        user.height = height ?? user.height;
        user.target = target ?? user.target;
        user.premiumAccount = premiumAccount ?? user.premiumAccount;
        user.age = age ?? user.age;

        const result = await userRepository.save(user);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Kullanıcı güncellenemedi", error });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getMongoRepository(User);

        const user = await userRepository.findOneBy({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        await userRepository.delete(user);
        return res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
    } catch (error) {
        return res.status(500).json({ message: "Kullanıcı silinemedi", error });
    }
};
