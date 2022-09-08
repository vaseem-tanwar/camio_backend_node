// import joi from 'joi'
const joi = require('joi')
module.exports = {
    addUser: async (req, res, next) => {
        const rules = joi.object({
            firstName: joi.string().required().error(new Error('First name is required')),
            lastName: joi.string().required().error(new Error('Last name is required')),
            email: joi.string().email().error(new Error('Valid email is required')),
            phone: joi.number().integer().error(new Error('Valid phone no is required')),
            date_of_join: joi.date().allow('').optional(),
            socialId: joi.string().allow('').optional(),
            password: joi.string().allow('').optional(),
            confirmPassword: joi.string().valid(joi.ref('password')).required().error(err => {
                if (err[0].value === undefined || err[0].value === '' || err[0].value === null) {
                    return new Error('Confirm password is required');
                } else if (err[0].value !== req.body.password) {
                    return new Error('Password and confirm password must match');
                }
            }),
        });

        const value = await rules.validate(req.body);
        if (value.error) {
            res.status(422).json({
                success: false,
                STATUSCODE: 422,
                message: value.error.message
            })
        } else {
            if ((req.body.email == '') && (req.body.password == '')) {
                res.status(422).json({
                    success: false,
                    STATUSCODE: 422,
                    message: 'Password is required'
                });
            } else {
                next();
            }

        }
    },
}