const express = require('express');
const router = express.Router();
const tasks = require('./Routes/task')
router.get('/homepage', (req, res)=>{
    console.log('welcome ');
    res.status(200).send({msg:'welcome to pesto tech', error: false})
})

router.use('/task', tasks)

module.exports = router;