var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
const config = require('./config');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/user.model');
const Tax = require('./models/tax-model');
const { ConversationPage } = require('twilio/lib/rest/conversations/v1/conversation');

// var muslter = require('multer');
// var upsload = multer();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config({
    path: path.join(__dirname, "../.env")
   });
   const app = express();

   const PORT = process.env.PORT || 3000;
   mongoose
    .connect('mongodb+srv://root:Pass1234@cluster0.ax4k0p5.mongodb.net/rbac?retryWrites=true&w=majority')
    .then(() => {
     console.log('Connected to the Database successfully');
    });
   

  //  app.use(bodyParser.urlencoded({ extended: true }));
  
  //  app.use(async (req, res, next) => {
       
  //      if (req.headers["x-access-token"]) {
  //       const accessToken = req.headers["x-access-token"];
  //       const { userId, exp } = await jwt.verify(accessToken, "vaseemm-scret-key");
  //       // Check if token has expired
  //       if (exp < Date.now().valueOf() / 1000) {
  //        return res.status(401).json({
  //         error: "JWT token has expired, please login to obtain a new one"
  //        });
  //       }
  //       res.locals.loggedInUser = await User.findById(userId);
  //       next();
  //      } else {
  //       next();
  //      }
  //    });
   
      

// var  userRoutes = require('./routes/auth')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Content-Type", "application/json");
  next();
});

// app.use(bodyParser.json()); 

// for parsing application/xwww-
//form-urlencoded
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// engine = require('ejs-mate');
// app.use(cors());

// for parsing multipart/form-data
// app.use(upload.array()); 

app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// engine = require('ejs-mate');
// app.use(cors());
//
// app.use('/api/user',(req, res, next)=>{

//     console.log("/api/user", req.body);
//     next()
// }, userRoutes)

// app.get('*', function (req,res){
//     res.send("working")
//     return res.end();
// })

// if (config.environmentSslFile == '1') {
//     var credentials = {
//         key: fs.readFileSync(config.sslPath.key, 'utf8'),
//         cert: fs.readFileSync(config.sslPath.cert, 'utf8')
//     };

//     var server = https.createServer(credentials, app);

// } else {
//     var server = http.createServer(app);
// }
app.use('/admin', require('./routes/auth.js'));
app.use('/admin/tax', require('./routes/tax.js'));
app.use('/admin/trucktype', require('./routes/trucktype.js'));
app.use('/admin/staticcontents', require('./routes/staticcontents'));
app.use('/admin/truck', require('./routes/truck'));
app.use('/admin/commission', require('./routes/commission'));
app.use('/admin/splash', require('./routes/splash'));
app.use('/admin/faq', require('./routes/faq'));

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
  });
app.timeout = 500000;