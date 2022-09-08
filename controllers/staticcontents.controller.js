
const staticcontents = require('../models/staticcontents-model');


// add Static Content API
module.exports.create = async (req, res, next) => {
    
    try {
        const addingstaticcontentsRecords = new staticcontents(req.body)
       
        const insertstaticcontents = addingstaticcontentsRecords.save();
        res.json({
            status: true,
            msg: "Static Contents created successfully..",
            data:addingstaticcontentsRecords,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}

// get all Static Content API
module.exports.getAll = async (req, res, next) => {
    
    try {
        const getstaticcontents = await staticcontents.find({});

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            data:getstaticcontents,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}

// get by id Static Content API
module.exports.getById = async (req, res, next) => {
    
    try {
        const _id = req.params.id;
        const getstaticcontents = await staticcontents.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            data:getstaticcontents,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


// update Static Contents API
module.exports.update = async (req, res, next) => {
    
    try {
        const _id = req.params.id;
        const getstaticcontents = await staticcontents.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.json({
            status: true,
            msg: "staticcontents updated successfully.",
            data:getstaticcontents,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


// update status Static Contents API
module.exports.statusupdate = async (req, res, next) => {
    
    try {
        const _id = req.params.id;
        const getstaticcontents = await staticcontents.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.json({
            status: true,
            msg: "Status updated successfully.",
            data:getstaticcontents,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


//delete static contents api
module.exports.delete = async (req, res, next) => {
    
    try {
        const getstaticcontents = await staticcontents.findByIdAndDelete(req.params.id);
        res.json({
            status: true,
            msg: "Static Contents deleted successfully.",
            data:getstaticcontents,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


