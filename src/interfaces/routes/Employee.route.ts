import { createEmployee } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", createEmployee)


export default EmployeeRoute