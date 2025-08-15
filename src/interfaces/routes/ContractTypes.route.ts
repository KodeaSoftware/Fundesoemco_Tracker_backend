import { getAllContractTypes } from "../controllers/EmploymentContract.controller";
import { Router } from "express";
const employment = Router()

employment.get("/api/employment/contractTypes", getAllContractTypes)

export default employment