var async = require('async');

const userSchema = require('../schema/user');
const { sendErrorResponse } = require('../utils/sendResponse');



function addUser(req,res){
    let user = req.body;
    try {
        if(user){
            userSchema.findOne({email:user.email}).then((user)=>{
                // User existance
                if(user)
                    return sendErrorResponse(res, 400, "User Already Exist")
                //creating new user
                let newUser = userSchema.create(user);
            });
            

        }
    } catch (error) {
        console.log(err);
        
    }

}