const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

var sendMailHtml = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

exports.sendMail = function(req, res, callback) {
    var mainOptions = req.body.configMail;

    sendMailHtml(mainOptions.html, function(err, html) {
        var output = {
            status: true,
            message: ''
        }

        var template = handlebars.compile(html);
        var replacements = {
            username: req.body.form.username,
            email: req.body.form.email,
            password: req.body.form.password,
            confirm_link: req.body.confirm_link
        };
        var htmlToSend = template(replacements);
    
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'shopxeom90@gmail.com',
                pass: 'nuzmgnanjfseyygs'
            }
        });

        mainOptions.html = htmlToSend;
        
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                output.status = false;
                output.message = err;
            }
            
            callback(output);
        });
    });
}