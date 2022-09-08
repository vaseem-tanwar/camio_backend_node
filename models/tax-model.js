const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    taxname: {
        type:String,
        required:true   
    },
    taxrate: {
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum : ['Active','Deactive'],
        default: 'Active'
    },
})

const Tax = new mongoose.model("Tax",taxSchema)

module.exports = Tax;