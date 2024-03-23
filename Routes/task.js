const express = require('express');
const router = express.Router();
const taskUtils = require('../Utils/taskUtils');
/**
 *  add the task with the approriate details 
 */

router.post('/add', async (req, res, next) => {
    try {
        console.log('body data is ', req.body);
        const data = req.body;
        if (!req.body || !req.body.title || !req.body.description || !req.body.status) {
            return res.status(400).send({ error: true, msg: `Details missing` })
        }
        let dbData = await taskUtils.findOne(req.body.title);
        if (dbData) {
            return res.status(200).send({ error: true, msg: 'Task already exist, please try to update' });
        }
        const newData = await taskUtils.addOne(data);
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



        res.status(200).send({ error: false, length: dbData.length, data: dbData });
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
        const title = decodeURIComponent(req.params.title);
        console.log('title is', title);
        let dbData = await taskUtils.findOne(title);
        if (dbData) {
            const newData = req.body;
            console.log('new data is ', newData);
            const dbResult = await taskUtils.updateData(newData);
            let msg = 'Tasks updated successfully'
            if (dbResult.error) {
                msg = 'some error occured';
                return res.status(200).send({ error: true, msg });
            }
            return res.status(200).send({ error: false, msg });

        } else {
            return res.status(400).send({ error: true, msg: `Task doesn't exists` });
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
        const title = decodeURIComponent(req.params.title);
        let dbData = await taskUtils.findOne(title);
        if (dbData) {
            const dbResult = await taskUtils.deleteOne(title);
            let msg = 'Tasks Deleted successfully'
            if (dbResult.error) {
                msg = 'some error occured';
                return res.status(200).send({ error: true, msg });
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