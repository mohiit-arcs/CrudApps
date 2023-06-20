const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

require('dotenv').config()

// signup route handler
exports.signup = async (req: any, res: any) => {
    try {
        // get data from req body
        const {name, email, password} = req.body;

        // check if user exist
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User Already Exists"
                }
            )
        }

        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        } catch(err) {
            return res.status(500).json(
                {
                    success: false,
                    message: 'Error in hashing password'
                }
            )
        }        

        // create user entry
        const user = await User.create(
            {
                name, email, password:hashedPassword
            }
        )

        return res.status(200).json(
            {
                success: true, 
                message: 'Account Created Successfully'
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).json(
            {
                success: false,
                error,
                message: "Account cannot be created, Try Again!"
            }
        )
    }
}

exports.login = async (req: any, res: any) => {
    try {
        // take data from req body
        const {email, password} = req.body;
        // console.log(email)
        // console.log(password)

        // validation
        if(!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Please fill all details carefully!'
                }
            )
        }

        let user = await User.findOne({email})
        if(!user) {
            return res.status(401).json(
                {
                    success: false,
                    message: "User Not Found, Please Sign Up First!"
                }
            )
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        // verify password
        const flag:boolean = await bcrypt.compare(password, user.password)
        // console.log("Hello World")
        // console.log(flag)
        if(await bcrypt.compare(password, user.password)) {
            // create jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }    
            );

            // user['token'] = token;
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    token, 
                    user,
                    message: 'User Logged In successfully'
                }
            )

        } else {
            return res.status(403).json(
                {
                    success: false,
                    message: "Password Incorrect"
                }
            )
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                success: false,
                message: "Login Failure"
            }
        )
    }
}