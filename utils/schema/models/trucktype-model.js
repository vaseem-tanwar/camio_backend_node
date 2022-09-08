const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    trucktype: {
        type:String,
        required:true   
    },
    description: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum : ['published','unpublished','disactive'],
        default: 'published'
    },
})

const Trucktype = new mongoose.model("Trucktype",truckSchema)

module.exports = Trucktype;