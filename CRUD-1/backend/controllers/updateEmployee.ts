export{}

const Employee = require('../models/employee')
const mongoose = require('mongoose')

const updateEmployee = async (req: any, res: any) => {
    try {

        const {id} = req.params;

        const {name, gender, email, mobile, password, employment_type, pincode, state, address}  = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: `Invalid employee id: ${id}`,
                message: "Please provide a valid employee id"
            });
        }

        // Check that at least one field is being updated
        if (!name && !gender && !email && !mobile && !password && !employment_type && !pincode && !state && !address ) {
            return res.status(400).json({
                success: false,
                error: "No fields to update",
                message: "Please provide at least one field to update"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            {_id: id},
            {name, gender, email, mobile, password, employment_type, pincode, state, address, updatedAt: Date.now()}
        )

        res.status(200).json(
            {
                success: true,
                data: employee,
                message: "Updated successfully"
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

module.exports = updateEmployee;