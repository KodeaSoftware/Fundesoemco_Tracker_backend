import { attendanceEmployee, createEmployee, deleteEmployee, editEmployee, getAllEmployee, getEmployeeByProjectandTypeContract, getAllEmployeeAttendance, downloadTemplate, bulkUpload } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", createEmployee)
EmployeeRoute.get("/api/employee", getAllEmployee)
EmployeeRoute.put("/api/employee", editEmployee)
EmployeeRoute.delete("/api/employee/:id", deleteEmployee)
EmployeeRoute.post("/api/employeeListProject", getEmployeeByProjectandTypeContract)
EmployeeRoute.post("/api/employee/attendance", attendanceEmployee)
EmployeeRoute.get("/api/employee/attendance", getAllEmployeeAttendance)

// Bulk operations
EmployeeRoute.get("/api/employee/template", downloadTemplate)
EmployeeRoute.post("/api/employee/bulk", upload.single("file"), bulkUpload)

export default EmployeeRoute