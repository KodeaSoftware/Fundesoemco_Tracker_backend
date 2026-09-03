import { getAllContractTypes, createContractType, editContractType, deleteContractType } from "../controllers/EmploymentContract.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const employment = Router();

employment.get("/api/employment/contractTypes", authMiddleware, getAllContractTypes);
employment.post("/api/employment/contractTypes", authMiddleware, createContractType);
employment.put("/api/employment/contractTypes", authMiddleware, editContractType);
employment.delete("/api/employment/contractTypes/:id", authMiddleware, deleteContractType);

export default employment;