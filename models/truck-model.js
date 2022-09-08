const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckname: {
        type:String,
        required:true   
    },
    truckbrand: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    trucktype: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum : ['Active','Deactive'],
        default: 'Active'
    },
})

const Truck = new mongoose.model("Truck",truckSchema)

module.exports = Truck;