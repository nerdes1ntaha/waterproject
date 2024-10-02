import { Router } from "express";
import { getAllUsers, register } from "../services/user.service";

const router = Router();

router.post("/register", register);
router.get("/getAllUsers", getAllUsers);

export default router;