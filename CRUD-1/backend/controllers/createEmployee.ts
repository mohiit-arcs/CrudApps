const Employee = require('../models/employee')

exports.createEmployee = async (req: any, res: any) => {
    try {
        const {name, gender, email, mobile, password, employment_type, pincode, state, address}  = req.body;

        const data = await Employee.create(
            {
                name, gender, email, mobile, password, employment_type, pincode, state, address
            }
        )

        // checking if all required fields are provided
        if (!name || !gender || !email || !mobile || !password || !employment_type || !pincode || !state || !address) {
            return res.status(400).json({
            success: false,
            data: null,
            message: 'Please provide all required fields'
            });
        }

        res.status(200).json(
            {
                success: true,
                data: data,
                message: "Data inserted succcessfully"
            }
        )

    } catch (error: any) {
        console.log(error)
        res.status(500).json(
            {
                success: false,
                data: "Data not inserted",
                message: error.message
            }
        )
        
    }
}