import { attendanceEmployee, createEmployee, deleteEmployee, editEmployee, getAllEmployee, getEmployeeByProjectandTypeContract, getAllEmployeeAttendance } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", createEmployee)
EmployeeRoute.get("/api/employee", getAllEmployee)
EmployeeRoute.put("/api/employee", editEmployee)
EmployeeRoute.delete("/api/employee/:id", deleteEmployee)
EmployeeRoute.post("/api/employeeListProject", getEmployeeByProjectandTypeContract)
EmployeeRoute.post("/api/employee/attendance", attendanceEmployee)
EmployeeRoute.get("/api/employee/attendance", getAllEmployeeAttendance)

export default EmployeeRoute