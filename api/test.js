import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.write('Test');
    res.end();
})

export default app;