const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    Question: {
        type:String,
        required:true   
    },
    answer: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum : ['Active','InActive'],
        default: 'Active'
    },
})

const faq = new mongoose.model("Faq",faqSchema)

module.exports = faq;