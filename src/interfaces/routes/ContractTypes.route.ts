import { getAllContractTypes } from "../controllers/EmploymentContract.controller";
import { Router } from "express";
const employment = Router()

employment.post("/api/employment/contractTypes", getAllContractTypes)

export default employment