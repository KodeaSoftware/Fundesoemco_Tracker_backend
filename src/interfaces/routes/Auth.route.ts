import { forgotPassword, loginAdmin, resetPassword, getMe } from "../controllers/Auth.controller";
import { Router } from "express";
const auth = Router()

auth.post("/auth", loginAdmin)
auth.get("/auth/me", getMe)
auth.post("/auth/forgot-password", forgotPassword)
auth.post("/auth/reset-password", resetPassword)

export default auth