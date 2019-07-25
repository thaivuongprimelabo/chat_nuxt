import express from 'express'
import nodemailer from 'nodemailer'
import fs from 'fs'
import handlebars  from 'handlebars'
import os from 'os';
import process from 'process';

const app = express()

app.use(express.json());

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

app.post('/', (req, res) => {

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
        // var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        //     from: 'Administrator',
        //     to: req.body.email,
        //     subject: '【App】 Active mail',
        //     html: htmlToSend
        // }

        mainOptions.html = htmlToSend;
        
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                output.status = false;
                output.message = err;
            }
            res.status(200).json(output);
        });
        res.status(200).json(output);
    });
})

export default app;