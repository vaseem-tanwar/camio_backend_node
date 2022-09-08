var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    date_of_join:{
        type: Date
    },
    status: { type: String, enum: ['INACTIVE', 'ACTIVE'], default: 'ACTIVE' },
    password: {
        type: String,
        required: true,
    }
})


userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 8, function(err, hash) {
        if (err) {
            return next(err);
        } else {
            if (user.password !== '') {
                user.password = hash
            }
            next();
        }
    })
});

module.exports = mongoose.model('User', userSchema);

