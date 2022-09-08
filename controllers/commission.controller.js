// server/controllers/userController.js

const Commission = require('../models/commission-model');

module.exports.create = async (req, res, next) => {

    try {
        const addingCommissionRecords = new Commission(req.body)

        const insertCommission = addingCommissionRecords.save();
        res.json({
            status: true,
            msg: "Commission created successfully..",
            response_data: addingCommissionRecords,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}


module.exports.getAll = async (req, res, next) => {

    try {
        const getCommission = await Commission.find({}).sort({ _id: -1 });

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getCommission,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}
module.exports.getById = async (req, res, next) => {

    try {
        console.log(req.params.CommissionId)

        const _id = req.params.CommissionId;
        const getCommission = await Commission.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getCommission,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

module.exports.update = async (req, res, next) => {

    try {
        console.log(req.params);
        const _id = req.params.CommissionId;
        const getCommission = await Commission.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Commission updated successfully.",
            response_data: getCommission,
        });
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

// update status Commission API
module.exports.statusupdate = async (req, res, next) => {

    try {
        const _id = req.params.id;
        const getCommission = await Commission.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Status updated successfully.",
            data: getCommission,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data: error,
        }))
    }
}


// delete Commission api
module.exports.delete = async (req, res, next) => {

    try {
        const getCommission = await Commission.findByIdAndDelete(req.params.id);
        res.json({
            status: true,
            msg: "Commission deleted successfully.",
            response_data: getCommission,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}
