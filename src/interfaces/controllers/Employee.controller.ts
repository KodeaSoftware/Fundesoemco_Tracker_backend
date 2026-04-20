import { createEmployeeUseCase } from "../../application/usecases/Employee/createEmployeeUseCase";
import { getAllEmployeeUseCase } from "../../application/usecases/Employee/getAllEmployeeUseCase";
import { deleteEmployeeUseCase } from "../../application/usecases/Employee/deleteEmployeeUseCase";
import { editEmployeeUseCase } from "../../application/usecases/Employee/editEmplyeeUseCase";
import { attendanceEmployeeUseCase } from "../../application/usecases/Employee/attendanceEmployeeUseCase";
import { getAllEmployeeAttendanceUseCase } from "../../application/usecases/Employee/getAllEmployeeAttendanceUseCase";
import { Request, Response } from "express";
import { getEmployeeByProjectandTypeContractUseCase } from "../../application/usecases/Employee/getEmployeeByProjectandTypeContractUseCase";
import { getEmployeeTemplateUseCase } from "../../application/usecases/Employee/getEmployeeTemplateUseCase";
import { bulkCreateEmployeesUseCase } from "../../application/usecases/Employee/bulkCreateEmployeesUseCase";
import path from "path";
import fs from "fs";
import "multer";

export async function createEmployee(req: Request, res: Response): Promise<void> {
    try {
        const dataEmployee = req.body
        const employeeCreated = await createEmployeeUseCase(dataEmployee)
        if (!employeeCreated) throw new Error("Failded to create a new Employee")
        res.status(200).json(employeeCreated)
    } catch (err: any) {
        console.error("Error creating employee:", err);
        res.status(500).send({ 
            message: "Internal server error: " + (err instanceof Error ? err.message : String(err)) 
        });
    }
}


export async function attendanceEmployee(req: Request, res: Response): Promise<void> {
    try {
        const dataEmployee = req.body
        const attendanceEmployee = await attendanceEmployeeUseCase(dataEmployee.cedula, dataEmployee.idProject)
        res.status(200).json(attendanceEmployee)
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}


export async function getAllEmployee(req: Request, res: Response): Promise<void> {
    try {
        const employeeList = await getAllEmployeeUseCase()
        if (!employeeList) throw new Error("Failded to create a new Employee")
        res.status(200).json(employeeList)
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function editEmployee(req: Request, res: Response): Promise<void> {
    try {
        const dataEmployee = req.body
        const editEmployee = await editEmployeeUseCase(dataEmployee)
        if (!editEmployee) throw new Error("Failded to edit a Employee")
        res.status(200).json(editEmployee)
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
        const idEmployee = req.params.id
        const deleteEmployeeData = await deleteEmployeeUseCase(idEmployee)
        if (!deleteEmployeeData) throw new Error("Failded to edit a Employee")
        res.status(200).json(deleteEmployeeData)
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function getEmployeeByProjectandTypeContract(req: Request, res: Response): Promise<void> {
    try {
        const { idProject, tipoContrato } = req.body

        const employeeList = await getEmployeeByProjectandTypeContractUseCase(idProject, tipoContrato)
        if (!employeeList) throw new Error("Failded get a employeeList for " + idProject)
        res.status(200).json(employeeList)
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function getAllEmployeeAttendance(req: Request, res: Response): Promise<void> {
    try {
        const employeeAttendanceList = await getAllEmployeeAttendanceUseCase()
        if (!employeeAttendanceList) throw new Error("Failed to get employee attendance list")
        res.status(200).json({ Data: employeeAttendanceList })
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error: " + err })
    }
}

export async function downloadTemplate(req: Request, res: Response): Promise<void> {
    try {
        const buffer = await getEmployeeTemplateUseCase();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=plantilla_empleados.xlsx');
        res.send(buffer);
    } catch (err: any) {
        res.status(500).send({ message: "Error al generar plantilla: " + err });
    }
}

export async function bulkUpload(req: Request, res: Response): Promise<void> {
    try {
        if (!req.file) {
            res.status(400).send({ message: "No se subió ningún archivo" });
            return;
        }
        const results = await bulkCreateEmployeesUseCase(req.file.buffer);
        res.status(200).json(results);
    } catch (err: any) {
        res.status(500).send({ message: "Error en carga masiva: " + err });
    }
}
