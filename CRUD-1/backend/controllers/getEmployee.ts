export {}

const Employee = require('../models/employee')
const mongoose = require('mongoose')

exports.getEmployee = async (req: any, res: any) => {
    try {
        const employees = await Employee.find({})

        // when there is no entry found in db
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No employees found"
            });
        }

        // response
        res.status(200).json(
            {
                success: true, 
                data: employees,
                message: "Employee entries are fetched"
            }
        )
        
    } catch (error: any) {
        console.log(error);
        res.status(500)
        .json( {
            success: false,
            error: error.message,
            message: "Server Error"
        })
    }
}

exports.getEmployeeById = async (req: any, res: any) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid Id')
            return res.status(400).json({
                success: false,
                error: `Invalid employee id: ${id}`,
                message: "Please provide a valid employee id"
            });
        }
        
        const employee = await Employee.findById({_id: id})
        
        if(!employee) {
            console.log('Invalid Employee')
            return res.status(404).json(
                {
                    success: false,
                    message: "No employee data found"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                data: employee,
                message: `Employee data for ${id} fetched successfully`
            }
        )
        
    } catch (error: any) {
        console.log(error);
        res.status(500)
        .json( {
            success: false,
            error: error.message,
            message: "Server Error"
        })
    }
}