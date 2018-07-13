require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const email = process.env.MAILER_EMAIL_ID || 'dominic.ceraso@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'February24th';
const nodemailer = require('nodemailer');

/**
 * SMTP Server details
 */
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
    user: email,
    pass: pass
    }
});
var rand,mailOptions,host,link;

/**
 * END SMTP Server details
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.get('/',function(req,res){
    res.sendfile('../index.html');
});
app.get('/send', function(req, res) {
    rand = Math.floor((Math.random() * 100) +54);
    host = req.get('host');
    link = "http://"+req.get('host')+"/verify?id="+rand;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your EMPREMART.COM user account..",
        html: "Hello, <br> please click the link below to verify your email address and to begin using our website.<br> <a href="+link+">Click here to Verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if(error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.get('/verify', function(req, res) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host')) == ("http://"+host))
    {
        console.log("Domain is matched, information is from an authentic email");
        if(req.query.id == rand)
        {
            console.log("Email is verified");
            res.end("<h1>Email "+mailOptions.to+" has been successfully verified.</h1>");
        } else {
            console.log("Email is not verified!");
            res.end("<h1>Bad Request!</h1>");
        }
    } else {
        res.end("<h1>Request is from an unknown source. </h1>");
    }
});


// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
