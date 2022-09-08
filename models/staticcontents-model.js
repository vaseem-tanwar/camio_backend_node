const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true   
    },
    category: {
        type: String,
        enum : ['faq','contact_us','terms_and_conditions'],
        required:true
    },
    content: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum : ['published','unpublished','disactive'],
        default: 'Active'
    },
})

const staticcontents = new mongoose.model("staticcontents",taxSchema)

module.exports = staticcontents;