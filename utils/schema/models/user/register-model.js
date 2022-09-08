const userSchema  = require('../../schema/user')

module.exports = {
    customerRegistration: (data, callBack) => {
        try {
            if (data) {
                async.waterfall([
                    function (nextCb) {
                        if (data.email) {
                            /** Check for user existence */
                            userSchema.countDocuments({ email: data.email }).exec(function (err, count) {
                                if (err) {
                                    nextCb(null, {
                                        success: false,
                                        STATUSCODE: 500,
                                        message: 'Internal DB error0',
                                        response_data: {}
                                    });
                                } else if (count) {
                                    nextCb(null, {
                                        success: false,
                                        STATUSCODE: 422,
                                        message: 'User already exists for this information.',
                                        response_data: {}
                                    });
                                } else {
                                    nextCb(null, {
                                        success: true,
                                        STATUSCODE: 200,
                                        message: 'success',
                                        response_data: {}
                                    })
                                }
                            });

                        } else {
                            /** Check for customer existence */
                            customerSchema.countDocuments({ email: data.email, loginType: 'GENERAL' }).exec(function (err, count) {
                                if (err) {
                                    nextCb(null, {
                                        success: false,
                                        STATUSCODE: 500,
                                        message: 'Internal DB error1',
                                        response_data: {}
                                    });
                                } else {
                                    if (count) {
                                        nextCb(null, {
                                            success: false,
                                            STATUSCODE: 422,
                                            message: 'User already exists for this email',
                                            response_data: {}
                                        });
                                    }
                                }
                            })

                        }
                    },
                    function (arg1, nextCb) {
                        if (arg1.STATUSCODE === 200) {
                            var customerdata = data;
                            var loginType = data.loginType;
                            if ((data.loginType == undefined) || (data.loginType == '') || (data.loginType == 'GENERAL')) { //IF NO SOCIAL SIGN UP THEN GENERAL LOGIN
                                loginType = data.loginType;
                            }
                            customerdata.loginType = loginType;
                            new customerSchema(customerdata).save(async function (err, result) {
                                if (err) {
                                    nextCb(null, {
                                        success: false,
                                        STATUSCODE: 500,
                                        message: 'Internal DB error3',
                                        response_data: {}
                                    });
                                } else {
                                    //SAVE LOG
                                    var logObj = {
                                        customerId: result._id,
                                        type: 'Customer Registration',
                                        log: 'New Customer registered',
                                        addedTime: new Date()
                                    }
                                    saveCustomerLog(logObj);
                                    updateUser({
                                        loginType: loginType
                                    }, { _id: result._id });

                                    if (loginType == 'GENERAL') {
                                        //ADD DATA IN USER LOGIN DEVICE TABLE
                                        var userDeviceData = {
                                            userId: result._id,
                                            userType: data.userType,
                                            appType: data.appType ? data.appType : 'BROWSER',
                                            // pushMode: data.pushMode ? data.pushMode : 'P',
                                            deviceToken: data.deviceToken ? data.deviceToken : ' '
                                        }
                                        if (data.appType) {
                                            await userDeviceLoginSchema.deleteMany({ userId: result._id, appType: data.appType }, function (err) { });
                                        }
                                        if (data.deviceToken) {
                                            await userDeviceLoginSchema.deleteMany({ deviceToken: data.deviceToken }, function (err) { });
                                        }
                                        new userDeviceLoginSchema(userDeviceData).save(async function (err, success) {
                                            if (err) {
                                                nextCb(null, {
                                                    success: false,
                                                    STATUSCODE: 500,
                                                    message: 'Internal DB error7',
                                                    response_data: {}
                                                });
                                            } else {
                                                // var loginId = success._id;
                                                const authToken = generateToken(result);
                                                if (data.profileImage) { // IF SOCIAL PROFILE PIC PRESENT THEN UPLOAD IT IN OUR SERVER
                                                    const download = require('image-downloader')
                                                    // Download to a directory and save with the original filename
                                                    const options = {
                                                        url: data.profileImage,
                                                        dest: `public/img/profile-pic/`   // Save to /path/to/dest/image.jpg
                                                    }
                                                    const FileType = require('file-type');
                                                    download.image(options)
                                                        .then(({ filename, image }) => {
                                                            (async () => {
                                                                var fileInfo = await FileType.fromFile(filename);
                                                                var fileExt = fileInfo.ext;
                                                                var fs = require('fs');
                                                                var file_name = `customerprofile-${Math.floor(Math.random() * 1000)}-${Math.floor(Date.now() / 1000)}.${fileExt}`;
                                                                let image_path = `public/img/profile-pic/${file_name}`;
                                                                fs.rename(filename, image_path, function (err) { })
                                                                updateUser({ //UPDATE THE DATA IN DB
                                                                    profileImage: file_name
                                                                }, { _id: result._id });
                                                                var response = {
                                                                    userDetails: {
                                                                        // firstName: result.firstName,
                                                                        // lastName: result.lastName,
                                                                        name: result.lastName,
                                                                        email: result.email,
                                                                        phone: result.phone.toString(),
                                                                        socialId: result.socialId,
                                                                        id: result._id,
                                                                        // loginId: loginId,
                                                                        profileImage: `${config.serverhost}:${config.port}/img/profile-pic/` + file_name,
                                                                        userType: data.userType,
                                                                        loginType: result.loginType
                                                                    },
                                                                    authToken: authToken
                                                                }
                                                                nextCb(null, {
                                                                    success: true,
                                                                    STATUSCODE: 200,
                                                                    message: 'Registration successfully.',
                                                                    response_data: response
                                                                });
                                                            })();
                                                        }).catch(err => {
                                                            callBack({
                                                                success: false,
                                                                STATUSCODE: 400,
                                                                message: 'Something went wrong.',
                                                                response_data: {}
                                                            });
                                                        })
                                                } else {
                                                    var response = {
                                                        userDetails: {
                                                            // firstName: result.firstName,
                                                            // lastName: result.lastName,
                                                            _id: result._id,
                                                            name: result.name,
                                                            email: result.email,
                                                            phone: result.phone.toString(),
                                                            socialId: result.socialId,
                                                            // loginId: loginId,
                                                            profileImage: '',
                                                            userType: result.userType,
                                                            loginType: result.loginType
                                                        },
                                                        authToken: authToken
                                                    }
                                                    nextCb(null, {
                                                        success: true,
                                                        STATUSCODE: 200,
                                                        message: 'Registration successfully.',
                                                        response_data: response
                                                    });
                                                }

                                            }
                                        })

                                    }

                                }
                            })
                        } else {
                            nextCb(null, arg1);
                        }
                    },
                    function (arg2, nextCb) {
                        if (arg2.STATUSCODE === 200) {
                            nextCb(null, arg2);
                        } else {
                            nextCb(null, arg2);
                        }
                    }
                ], function (err, result) {
                    if (err) {
                        callBack({
                            success: false,
                            STATUSCODE: 500,
                            message: 'Internal DB error4',
                            response_data: {}
                        });
                    } else {
                        callBack(result);
                    }
                })
            } else {
                callBack({
                    success: false,
                    STATUSCODE: 400,
                    message: 'Something went wrong.',
                    response_data: {}
                });
            }
        }
        catch (err) {
            callBack({
                success: false,
                STATUSCODE: 400,
                message: 'Something went wrong.',
                response_data: {}
            });
        }
    },
}