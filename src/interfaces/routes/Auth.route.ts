import { loginAdmin } from "../controllers/Auth.controller";
import { Router } from "express";
const auth = Router()

auth.post("/auth", loginAdmin)

export default auth