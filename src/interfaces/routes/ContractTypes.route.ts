import { getAllContractTypes, createContractType } from "../controllers/EmploymentContract.controller";
import { Router } from "express";
const employment = Router()

employment.get("/api/employment/contractTypes", getAllContractTypes)
employment.post("/api/employment/contractTypes", createContractType)

export default employment