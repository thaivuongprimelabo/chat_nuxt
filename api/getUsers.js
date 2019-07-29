import express from 'express'
const api = require('../functions/modules/api');
const app = express()
app.use(express.json());

app.post('/', (req, res) => {
    api.getUsers(req, res);
})

export default app;