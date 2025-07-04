import { createEmployee, getAllEmployee } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", createEmployee)
EmployeeRoute.get("/api/employee", getAllEmployee)


export default EmployeeRoute