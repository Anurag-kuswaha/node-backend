const express = require('express');
const router = express.Router();
const taskUtils  = require('../Utils/taskUtils');
/**
 *  add the task with the approriate details 
 */

router.post('/add', async (req, res, next) => {
    try {
        console.log(req.body);
        const data = req.body
        let dbData = await taskUtils.findAll()
        // adding the data
        dbData[data.title] = data
        console.log('new dbData is ', dbData);
        const newData = await taskUtils.updateData(dbData);
        let msg = 'Tasks added successfully'
        if (newData.error) {
            msg = 'some error occured';
        }
        res.status(200).send({ error: false, msg });
    } catch (e) {
        console.log('error is', e);
        res.status(400).send({ error: true, msg: `error occured at ${e.message}` })
    }
})

/**
 * to get the list of tasks
 */
router.get('/list', async (req, res, next) => {
    try {
        let dbData = await taskUtils.findAll();
        let length = Object.keys(dbData).length ;
        res.status(200).send({ error: false, length, dbData });
    } catch (e) {
        console.log('error is', e);
        res.status(400).send({ error: true, msg: `error occured at ${e.message}` })
    }
})

/**
 * to update the task
 */
router.patch('/update/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        let dbData = await taskUtils.findOne(title);
        if (dbData) {
            const newData = req.body;
            console.log('new data is ', newData);
            let dbData = await taskUtils.findAll();
            if (newData.description)
                dbData[title].description = newData.description
            if (newData.status)
                dbData[title].status = newData.status
            const dbResult = await taskUtils.updateData(dbData);
            let msg = 'Tasks updated successfully'
            if (dbResult.error) {
                msg = 'some error occured';
            }
            return res.status(200).send({ error: false, msg });

        } else {
            return res.status(400).send({ error: true, msg: `Status doesn't exists` });
        }
    } catch (e) {
        console.log('error is', e);
        return res.status(400).send({ error: true, msg: `error occured at ${e.message}` })
    }
})

/**
 * to delete the task
 */
router.delete('/delete/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        let dbData = await taskUtils.findOne(title);
        if (dbData) {
            const newData = req.body;
            console.log('new data is ', newData);
            let dbData = await taskUtils.findAll();
            //delete from the DB
            delete dbData[title];
            const dbResult = await taskUtils.updateData(dbData);
            let msg = 'Tasks Deleted successfully'
            if (dbResult.error) {
                msg = 'some error occured';
            }
            return res.status(200).send({ error: false, msg });

        } else {
            return res.status(400).send({ error: true, msg: `Task doesn't exist` });
        }
    } catch (e) {
        console.log('error is', e);
        return res.status(400).send({ error: true, msg: `error occured at ${e.message}` })
    }
})

module.exports = router;