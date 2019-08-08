import express from 'express'
import firebase from 'firebase';
import md5 from 'md5';

const app = express()
app.use(express.json());

const api = require('../functions/modules/api');
app.post('/', (req, res) => {
    api.onLogin(req, res);
})

export default app;