
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
try {
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use((err, req, res, next) => {
        console.log('error handling endpoint');
        res.status(500).send({ error: true, msg: 'Invalid endpoint' });
        next(err);
    });
    const port = process.env.port || 3001 ;
    app.listen(port, (e) => {
        console.log(`Backend server is running on port ${port}`)
    })
}
catch (e) {
    console.log('error is ', e);
}
module.exports = app



