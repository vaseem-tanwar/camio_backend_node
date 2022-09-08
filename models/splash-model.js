const mongoose = require('mongoose');

const splashSchema = new mongoose.Schema({
    headingtext: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum : ['Active','InActive'],
        default: 'Active'
    },
    mainContent: {
        type: String,
        required: true,
    },
    image: {
        type:String,
        required:false
    },
    Date : {
        type : Date, 
        default: Date.now 
    }
});

const Splash = new mongoose.model("Splash",splashSchema)
module.exports = Splash;