const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    commissionname: {
        type:String,
        required:true   
    },
    commissionrate: {
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum : ['Active','Deactive'],
        default: 'Active'
    },
})

const Commission = new mongoose.model("Commission",commissionSchema)

module.exports = Commission;