import { Router } from "express";
import { getAllUsers, register } from "../controller/user.controller";

const router = Router();

router.post("/register", register);
router.get("/getAllUsers", getAllUsers);

export default router;