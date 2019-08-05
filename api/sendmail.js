import express from 'express'
import nodemailer from 'nodemailer'
import fs from 'fs'
import handlebars  from 'handlebars'

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

    var mainOptions = req.body.config;

    sendMailHtml(mainOptions.html, function(err, html) {
        var output = {
            status: true,
            message: ''
        }

        var template = handlebars.compile(html);
        var replacements = mainOptions.data;
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
            res.status(200).json(output);
        });
        res.status(200).json(output);
    });
})

export default app;