import { createEmployeeUseCase } from "../../application/usecases/Employee/createEmployeeUseCase";
import { getAllEmployeeUseCase } from "../../application/usecases/Employee/getAllEmployeeUseCase";
import { deleteEmployeeUseCase } from "../../application/usecases/Employee/deleteEmployeeUseCase";
import { editEmployeeUseCase } from "../../application/usecases/Employee/editEmplyeeUseCase";
import { attendanceEmployeeUseCase } from "../../application/usecases/Employee/attendanceEmployeeUseCase";
import { getAllEmployeeAttendanceUseCase } from "../../application/usecases/Employee/getAllEmployeeAttendanceUseCase";
import { Request, Response } from "express";
import { getEmployeeByProjectandTypeContractUseCase } from "../../application/usecases/Employee/getEmployeeByProjectandTypeContractUseCase";

export async function createEmployee(req: Request, res: Response) {
    try {
        const dataEmployee = req.body
        const employeeCreated = await createEmployeeUseCase(dataEmployee)
        if (!employeeCreated) throw new Error("Failded to create a new Employee")
        res.status(200).json(employeeCreated)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}


export async function attendanceEmployee(req: Request, res: Response) {
    try {
        const dataEmployee = req.body
        const attendanceEmployee = await attendanceEmployeeUseCase(dataEmployee.cedula, dataEmployee.idProject)
        res.status(200).json(attendanceEmployee)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}


export async function getAllEmployee(req: Request, res: Response) {
    try {
        const employeeList = await getAllEmployeeUseCase()
        if (!employeeList) throw new Error("Failded to create a new Employee")
        res.status(200).json(employeeList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function editEmployee(req: Request, res: Response) {
    try {
        const dataEmployee = req.body
        const editEmployee = await editEmployeeUseCase(dataEmployee)
        if (!editEmployee) throw new Error("Failded to edit a Employee")
        res.status(200).json(editEmployee)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function deleteEmployee(req: Request, res: Response) {
    try {
        const idEmployee = req.params.id
        const deleteEmployeeData = await deleteEmployeeUseCase(idEmployee)
        if (!deleteEmployeeData) throw new Error("Failded to edit a Employee")
        res.status(200).json(deleteEmployeeData)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function getEmployeeByProjectandTypeContract(req: Request, res: Response) {
    try {
        const { idProject, tipoContrato } = req.body

        const employeeList = await getEmployeeByProjectandTypeContractUseCase(idProject, tipoContrato)
        if (!employeeList) throw new Error("Failded get a employeeList for " + idProject)
        res.status(200).json(employeeList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error" + err })
    }
}

export async function getAllEmployeeAttendance(req: Request, res: Response) {
    try {
        const employeeAttendanceList = await getAllEmployeeAttendanceUseCase()
        if (!employeeAttendanceList) throw new Error("Failed to get employee attendance list")
        res.status(200).json(employeeAttendanceList)
    } catch (err) {
        res.status(500).send({ message: "Internal server error: " + err })
    }
}
