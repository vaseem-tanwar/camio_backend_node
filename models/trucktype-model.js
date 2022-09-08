const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    trucktype: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum : ['published','unpublished','disactive'],
        default: 'published'
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type:String,
        required:true
    },
});

const Trucktype = new mongoose.model("Trucktype",truckSchema)
module.exports = Trucktype;