import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.write('Test1111111111111');
    res.end();
})

export default app;