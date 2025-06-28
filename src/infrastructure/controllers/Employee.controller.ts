import { createEmployeeUseCase } from "../../application/usecases/Employee/createEmployeeUseCase";
import { getAllEmployeeUseCase } from "../../application/usecases/Employee/getAllEmployeeUseCase";
import { deleteEmployeeUseCase } from "../../application/usecases/Employee/deleteEmployeeUseCase";
import { editEmployeeUseCase} from "../../application/usecases/Employee/editEmplyeeUseCase";
import { Request, Response } from "express";

export async function createEmployee(req: Request, res: Response){
    try {
        const dataEmployee = req.body
        const employeeCreated = await createEmployeeUseCase(dataEmployee)
        if(!employeeCreated) throw new Error("Failded to create a new Employee")
        res.status(200).json(employeeCreated)
    } catch (err) {
        res.status(500).send({message: "Internal server error" + err})
    }
}


