const express = require('express')
const userValidator = require('../middlewhere/validators/user-validator')

var userApi = express.Router()
userApi.use(express.json())
userApi.use(express.urlencoded({extended:false}))
// userValidator.addUser , 
userApi.get("/add", function(req,res){

    console.log("/add",req.body);
    res.send("user/add")
    return res.end()
} )


module.exports = userApi