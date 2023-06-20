export {}

const Employee = require('../models/employee')
const mongoose = require('mongoose')

exports.deleteEmployee = async (req: any, res: any) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: `Invalid employee id: ${id}`,
                message: "Please provide a valid employee id"
            });
        }

        await Employee.findByIdAndDelete({_id: id})

        res.status(200).json(
            {
                success: true,
                message: "Data deleted succesfully"
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