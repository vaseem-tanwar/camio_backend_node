// server/controllers/userController.js
const express = require('express')
const Splash = require('../models/splash-model');
const uploadFile = require("../middlewhere/upload");

// add Splash api
module.exports.create = async (req, res, next) => {

    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        req.body.image = req.file.originalname;
        const addingSplashRecords = new Splash(req.body)

        const insertSplash = addingSplashRecords.save();
        res.json({
            status: true,
            msg: "Splash created successfully..",
            response_data: addingSplashRecords,
        })
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}


//get all splash  api
module.exports.getAll = async (req, res, next) => {

    try {
        const getSplash = await Splash.find({}).sort({ _id: -1 });

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getSplash,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

// get one splash data
module.exports.getById = async (req, res, next) => {
   

    try {
        console.log("----------------",req.params.splashId)

        const _id = req.params.splashId;
        const getSplash = await Splash.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getSplash,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}


// delete Splash api
module.exports.delete = async (req, res, next) => {
    
    try {
        const getSplash = await Splash.findByIdAndDelete(req.params.splashId);
        res.json({
            status: true,
            msg: "Static Contents deleted successfully.",
            data:getSplash,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


//update splash api
module.exports.update = async (req, res, next) => {

    try {
        console.log(req.params);
        const _id = req.params.key;
        const getSplash = await Splash.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Splash updated successfully.",
            response_data: getSplash,
        });
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}


//update status splash api
module.exports.statusupdate = async (req, res, next) => {

    try {
        console.log(req.params);
        const _id = req.params.key;
        const getSplash = await Splash.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "status updated successfully.",
            response_data: getSplash,
        });
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}