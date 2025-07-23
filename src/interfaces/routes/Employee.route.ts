import { createEmployee, deleteEmployee, editEmployee, getAllEmployee, getEmployeeByProjectandTypeContract } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", createEmployee)
EmployeeRoute.get("/api/employee", getAllEmployee)
EmployeeRoute.put("/api/employee", editEmployee)
EmployeeRoute.delete("/api/employee/:id", deleteEmployee)
EmployeeRoute.post("/api/employeeListProject", getEmployeeByProjectandTypeContract)

export default EmployeeRoute