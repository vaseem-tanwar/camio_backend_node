const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

module.exports.allowIfLoggedin = async (req, res, next) => {
    
    var HeaderToken = req.headers["authorization"];
    if (!HeaderToken) {
      return res.status(403).send({
          "status":false,
          "msg":"A token is required for authentication",
          "data":[],
      });
    }
    try {
      var token = req.headers["authorization"].replace("Bearer ",'');
      const decoded = jwt.verify(token,  "vaseemm-scret-key");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({
          "status":false,
          "msg":"Invalid token provided.",
          "data":[],
      });
    }
    return next();
}

const { roles } = require('../roles')

module.exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);

            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }}