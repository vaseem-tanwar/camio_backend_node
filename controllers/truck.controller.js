// server/controllers/userController.js
const Truck = require('../models/truck-model');


//  add truck api
module.exports.create = async (req, res, next) => {

    try {
        const addingTruckRecords = new Truck(req.body)

        const insertTruck = addingTruckRecords.save();
        res.json({
            status: true,
            msg: "Truck created successfully..",
            response_data: addingTruckRecords,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}


// get truck api
module.exports.getAll = async (req, res, next) => {

    try {
        const getTruck = await Truck.find({}).sort({ _id: -1 });

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getTruck,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

//get by id api
module.exports.getById = async (req, res, next) => {

    try {
        console.log(req.params.TruckId)

        const _id = req.params.TruckId;
        const getTruck = await Truck.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getTruck,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}


// update truck api
module.exports.update = async (req, res, next) => {

    try {
        console.log(req.params);
        const _id = req.params.TruckId;
        const getTruck = await Truck.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Truck updated successfully.",
            response_data: getTruck,
        });
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

// update status Truck API
module.exports.statusupdate = async (req, res, next) => {

    try {
        const _id = req.params.id;
        const getTruck = await Truck.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Status updated successfully.",
            data: getTruck,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data: error,
        }))
    }
}


// delete Truck api
module.exports.delete = async (req, res, next) => {

    try {
        const getTruck = await Truck.findByIdAndDelete(req.params.id);
        res.json({
            status: true,
            msg: "Truck deleted successfully.",
            response_data: getTruck,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}



