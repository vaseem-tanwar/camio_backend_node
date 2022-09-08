// server/controllers/userController.js

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports.signup = async (req, res, next) => {
    console.log('asdasd');
    try {
        const { email, password, role, phone, firstname,lastname ,status} = req.body
        
        const hashedPassword = await hashPassword(password);
        const emailCheck = await User.findOne({email:email});
        console.log('----Email---', emailCheck);
        if(emailCheck == null){
        const newUser = new User({ email, password: hashedPassword,phone:phone,firstname:firstname,lastname:lastname,status:status, role: role || "basic" });
        const accessToken = jwt.sign({ userId: newUser._id }, config.jwtSecret, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();

        res.json({
            status: true,
            message: "Signup successfully..",
            response_data:newUser,
        })
    }else{
        res.json({
            status: false,
            message: "Email already exist.",
            response_data:[],
        })
    }
    } catch (error) {
        next(res.json({
            status: false,
            message: "Something wrong with details",
            response_data:error,
        }))
    }
}


module.exports.login = async (req, res, next) => {
    console.log('TEST');
     try {
        const { email, password } = req.body;
        console.log('-----EMAIL----',req.body);
        const user = await User.findOne({ email });
        if (!user) return next(res.send({
            success:false,
            message:'Email does not exist',
            response_data:{}
        }));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(res.send({
            success:false,
            message:'Password is not correct',
            response_data:{}
        }));
        const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.json({
            success: true,
            message: "Login successfully.",
            response_data: { email: user.email, role: user.role,accessToken:accessToken },
        })
     } catch (error) {
         next(res.json({
            success: false,
            message: "Something wrong with request.",
            response_data: error,
        }));
     }
}


module.exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        response_data: users
    });
}

// Get user shippers API
module.exports.getshippers = async (req, res, next) => {
    const users = await User.find({role:"shipper"}).sort({_id:-1});
    res.status(200).json({
        success: true,
        response_data: users
    });
}

module.exports.postshippers = async (req, res, next) => {
    try {
        const { email, password, role, phone, firstname,lastname,city,country ,status} = req.body
        
        const hashedPassword = await hashPassword(password);
        const emailCheck = await User.findOne({email:email});
        if(emailCheck == null){
        const newUser = new User({ email, password: hashedPassword,phone:phone,firstname:firstname,city:city,country:country,lastname:lastname,status:status, role: "shipper" });

        await newUser.save();

        res.json({
            status: true,
            msg: "shippers Add successfully..",
            response_data:newUser,
        })
    }else{
        res.json({
            status: false,
            msg: "Email already exist.",
            response_data:[],
        })
    }
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}
// Get user truck owner API
module.exports.gettruckowner = async (req, res, next) => {
    const users = await User.find({role:"truck_owner"}).sort({_id:-1});
    res.status(200).json({
        success: true,
        response_data: users
    });
}

// Add Truck Owner API
module.exports.posttruckowner = async (req, res, next) => {
    try {
        const { email, password, role, phone, firstname,lastname,city,country ,status} = req.body
        
        const hashedPassword = await hashPassword(password);
        const emailCheck = await User.findOne({email:email});
        if(emailCheck == null){
        const newUser = new User({ email, password: hashedPassword,phone:phone,firstname:firstname,city:city,country:country,lastname:lastname,status:status, role: "truck_owner" });

        await newUser.save();

        res.json({
            status: true,
            msg: "Truck Owner Add successfully..",
            response_data:newUser,
        })
    }else{
        res.json({
            status: false,
            msg: "Email already exist.",
            response_data:[],
        })
    }
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}
// Get user truck driver API
module.exports.gettruckdriver = async (req, res, next) => {
    const users = await User.find({role:"truck_driver"}).sort({_id:-1});
    res.status(200).json({
        success: true,
        response_data: users
    });
}

// Add Truck Driver API
module.exports.posttruckdriver = async (req, res, next) => {
    try {
        const { email, password, role, phone, firstname,lastname,city,country ,status} = req.body
        
        const hashedPassword = await hashPassword(password);
        const emailCheck = await User.findOne({email:email});
        if(emailCheck == null){
        const newUser = new User({ email, password: hashedPassword,phone:phone,firstname:firstname,city:city,country:country,lastname:lastname,status:status, role: "truck_driver" });

        await newUser.save();

        res.json({
            status: true,
            msg: "Truck Driver Add successfully..",
            response_data:newUser,
        })
    }else{
        res.json({
            status: false,
            msg: "Email already exist.",
            response_data:[],
        })
    }
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}
module.exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            success: true, 
            response_data: user
        });
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            success: true,
            response_data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            response_data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
}

module.exports.changeStatus = async (req, res, next) => {
    try {
        const status = req.body||'Active' ;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, status);
        const user = await User.findById(userId)
        res.status(200).json({
            success: true,
            response_data: user,
            message: 'status has been changed'
        });
    } catch (error) {
        next(error)
    }
}

module.exports.create = async (req, res, next) => {
    try {
        const { email, password, role, phone, firstname,lastname ,status} = req.body
        
        const hashedPassword = await hashPassword(password);
        const emailCheck = await User.findOne({email:email});
        if(emailCheck == null){
        const newUser = new User({ email, password: hashedPassword,phone:phone,firstname:firstname,lastname:lastname,status:status, role: role || "basic" });

        await newUser.save();

        res.json({
            status: true,
            msg: "User Add successfully..",
            data:newUser,
        })
    }else{
        res.json({
            status: false,
            msg: "Email already exist.",
            data:[],
        })
    }
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


module.exports.searchUser = async(req, res) => {
    // try {
    var regax = new RegExp(req.params.key,'i');
    User.find({$or:[{firstname: regax},{lastname:regax},{email:regax}]}).then((result)=>{
        if(result.length > 0){
            res.json({
                status: true,
                msg: "User fetch succesfully",
                data:result,
            })
        }else{
            res.json({
                status: false,
                msg: "No data found with given string",
                data:[],
            })
        }
           })
        }

// Add this to the top of the file


// module.exports.allowIfLoggedin = async (req, res, next) => {
//     try {

//         const user = {
//         "email": "vaseem@gmail.com",
//         "role": "basic",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU4YmU2YmY4MzQwYWU5YzljYzZkNzUiLCJpYXQiOjE2NTk0NDQwOTEsImV4cCI6MTY1OTUzMDQ5MX0.5IfMDATEdAsWKiCbvgwtrNu6wy1cNKky6aol8SFiRNI"
// };
//         console.log('user-----',user);
//         if (!user)
//             return res.status(401).json({
//                 error: "You need to be logged in to access this route"
//             });
//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// }