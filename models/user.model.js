
// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     firstname: {
         type: String,
         required: true,
         trim: true
     },
     lastname: {
         type: String,
         required: true,
         trim: true
     },
    // email: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // phone: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    email: {
        type: String,
        in:['body'],
        validate: {
        validator: (value) =>
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
        value
        ),
        message: 'Invalid email address',
        },
        unique: [true, 'Email is uniueq'],
        isexist:[true,"----asdasd---"],
        },
    // phone: {
    //     type: String,
    //     validate: {
    //     validator: (value) => phone(value).isValid,
    //     message: 'Invalid phone number',
    //     },
    //     required: [true, 'Phone number is required'],
    //     unique: [true, 'phone number already exist.'],
    //     },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'shipper',
        enum: ["truck_owner", "truck_driver", "shipper",  "admin"]
    },
    status: {
        type: String,
        enum: ["Active", "InActive"],
        default:'Active'
    },
    phone:{
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;