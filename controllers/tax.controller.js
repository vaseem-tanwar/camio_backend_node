// server/controllers/userController.js

const Tax = require('../models/tax-model');

module.exports.create = async (req, res, next) => {

    try {
        const addingTaxRecords = new Tax(req.body)

        const insertTax = addingTaxRecords.save();
        res.json({
            status: true,
            msg: "Tax created successfully..",
            response_data: addingTaxRecords,
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
        const getTax = await Tax.find({}).sort({ _id: -1 });

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getTax,
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
        console.log(req.params.taxId)

        const _id = req.params.taxId;
        const getTax = await Tax.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            response_data: getTax,
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
        const _id = req.params.taxId;
        const getTax = await Tax.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Tax updated successfully.",
            response_data: getTax,
        });
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

// update status tax API
module.exports.statusupdate = async (req, res, next) => {

    try {
        const _id = req.params.id;
        const getTax = await Tax.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.json({
            status: true,
            msg: "Status updated successfully.",
            data: getTax,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data: error,
        }))
    }
}


// delete tax api
module.exports.delete = async (req, res, next) => {

    try {
        const getTax = await Tax.findByIdAndDelete(req.params.id);
        res.json({
            status: true,
            msg: "Tax deleted successfully.",
            response_data: getTax,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            response_data: error,
        }))
    }
}

// search tax API
module.exports.searchTax = async (req, res) => {
    // try {
    // var regax = new RegExp(req.body, 'i');
    // User.find({ $or: [{ firstname: req.body.search }, { lastname: req.body.search }, { email: req.body.search }] }).then((result) => {
    Tax.find({ "taxname": new RegExp(".*" + req.body.search + ".*") }).then((result) => {
        if (result.length > 0) {
            res.json({
                status: true,
                msg: "tax fetch succesfully",
                data: result,
            })
        } else {
            res.json({
                status: false,
                msg: "No data found with given string",
                data: [],
            })
        }
    })
    //  } catch (error) {
    //     res.json({
    //         status: false,
    //         msg: "Something wrong with request",
    //         data:[],
    //     })
    //     } 
}