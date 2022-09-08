// server/controllers/userController.js

const Trucktype = require('../models/trucktype-model');

module.exports.create = async (req, res, next) => {
    
    try {
        // console.log("create truck esfsdf ",req.body);
        const addingTrucktypeRecords = new Trucktype(req.body)
       
        const insertTrucktype = addingTrucktypeRecords.save();
        res.json({
            status: true,
            msg: "Truck type created successfully..",
            response_data:addingTrucktypeRecords,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data:error,
        }))
    }
}


module.exports.getAll = async (req, res, next) => {
    
    try {
        const getTrucktype = await Trucktype.find({}).sort({_id: -1});
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