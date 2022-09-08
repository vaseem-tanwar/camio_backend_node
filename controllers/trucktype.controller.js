// server/controllers/userController.js
const express = require('express')
const Trucktype = require('../models/trucktype-model');
const uploadFile = require("../middlewhere/upload");

// add truck type api
module.exports.create = async (req, res, next) => {

      try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    req.body.image = req.file.originalname;
    const addingTrucktypeRecords = new Trucktype(req.body)
   
    const insertTrucktype = addingTrucktypeRecords.save();
        res.json({
            status: true,
            msg: "Truck type created successfully..",
            response_data:addingTrucktypeRecords,
        })
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
    
    // try {
    //     // console.log("create truck esfsdf ",req.body);
    //     const addingTrucktypeRecords = new Trucktype(req.body)
       
    //     const insertTrucktype = addingTrucktypeRecords.save();
    //     res.json({
    //         status: true,
    //         msg: "Truck type created successfully..",
    //         response_data:addingTrucktypeRecords,
    //     })
    // } catch (error) {
    //     next(res.json({
    //         status: false,
    //         msg: "Something wrong with details",
    //         response_data:error,
    //     }))
    // }
}


//get all truck type api
module.exports.getAll = async (req, res, next) => {
    
    try {
        const getTrucktype = await Trucktype.find({}).sort({_id: -1});
        if (!getTrucktype) return [];
        // return nestedCategories(getTrucktype);
        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data:nestedCategories(getTrucktype),
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}


// Nested Categories function
function nestedCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parent_id == null);
    } else {
        category = categories.filter(cat => String(cat.parent_id) == String(parentId));
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            trucktype: cate.trucktype,
            description: cate.description,
            image: cate.image,
            status: cate.status,
            children: nestedCategories(categories, cate._id)
        })
    }
    return categoryList;
}


// get by id api
module.exports.getById = async (req, res, next) => {
    
    try {
        const _id = req.params.id;
        const getTrucktype = await Trucktype.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data:getTrucktype,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}


// update truck type api
module.exports.update = async (req, res, next) => {
    
    try {
        const _id = req.params.truckId;
        const getTrucktype = await Trucktype.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.json({
            status: true,
            msg: "Truck type updated successfully.",
            response_data:getTrucktype,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}


// delete truck type api
module.exports.delete = async (req, res, next) => {
    
    try {
        const _id = req.params.truckId;
        const getTrucktype = await Trucktype.findByIdAndDelete(_id);

        res.json({
            status: true,
            msg: "Truck type deleted successfully.",
            response_data:getTrucktype,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}