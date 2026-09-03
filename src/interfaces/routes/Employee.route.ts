import { attendanceEmployee, createEmployee, deleteEmployee, editEmployee, getAllEmployee, getEmployeeByProjectandTypeContract, getAllEmployeeAttendance, downloadTemplate, bulkUpload } from "../../interfaces/controllers/Employee.controller";
import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const EmployeeRoute = Router()


// Create new Employee
EmployeeRoute.post("/api/employee", authMiddleware, createEmployee)
EmployeeRoute.get("/api/employee", authMiddleware, getAllEmployee)
EmployeeRoute.put("/api/employee", authMiddleware, editEmployee)
EmployeeRoute.delete("/api/employee/:id", authMiddleware, deleteEmployee)
EmployeeRoute.post("/api/employeeListProject", authMiddleware, getEmployeeByProjectandTypeContract)
EmployeeRoute.post("/api/employee/attendance", authMiddleware, attendanceEmployee)
EmployeeRoute.get("/api/employee/attendance", authMiddleware, getAllEmployeeAttendance)

// Bulk operations
EmployeeRoute.get("/api/employee/template", authMiddleware, downloadTemplate)
EmployeeRoute.post("/api/employee/bulk", authMiddleware, upload.single("file"), bulkUpload)

export default EmployeeRoute
