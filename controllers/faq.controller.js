
const Faq = require('../models/faq-model');


// add Faq API
module.exports.create = async (req, res, next) => {
    
    try {
        const addingFaqRecords = new Faq(req.body)
       
        const insertFaq = addingFaqRecords.save();
        res.json({
            status: true,
            msg: "Faq created successfully..",
            data:addingFaqRecords,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}

// get all Faq API
module.exports.getAll = async (req, res, next) => {
    
    try {
        const getFaq = await Faq.find({});

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            data:getFaq,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}

// get by id Faq API
module.exports.getById = async (req, res, next) => {
    
    try {
        const _id = req.params.key;
        const getFaq = await Faq.findById(_id);

        res.json({
            status: true,
            msg: "Data fetch successfully.",
            data:getFaq,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


// update Faq API
module.exports.update = async (req, res, next) => {
    
    try {
        const _id = req.params.key;
        const getFaq = await Faq.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.json({
            status: true,
            msg: "Faq updated successfully.",
            data:getFaq,
        })
    } catch (error) {
        next(res.json({
            status: false,
            msg: "Something wrong with details",
            data:error,
        }))
    }
}


//update status Faq api
module.exports.statusupdate = async (req, res, next) => {

    try {
        console.log(req.params);
        const _id = req.params.key;
        const getSplash = await Faq.findByIdAndUpdate(_id, req.body, {
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


// delete faq api
module.exports.delete = async (req, res, next) => {
    
    try {
        const getSplash = await Faq.findByIdAndDelete(req.params.key);
        res.json({
            status: true,
            msg: "Faq deleted successfully.",
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


