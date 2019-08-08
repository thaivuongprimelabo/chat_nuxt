import express from 'express'
import md5 from 'md5';
const api = require('../functions/modules/api');
const app = express()
app.use(express.json());

app.post('/', (req, res) => {
    api.onRegister(req, res);
})

export default app;