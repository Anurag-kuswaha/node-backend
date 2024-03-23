const db = require('../models');
const findAll = async () => {
    const dbData = await db.Task.findAll()

    console.log('dbData is', dbData);
    return dbData;
}

const findOne = async (title) => {
    let dbData = await db.Task.findOne({
        where: {
            title: title
        }
    });
    console.log('dbData is', dbData);
    return dbData;
}
const addOne = async (data) => {
    try {
        let dbData = await db.Task.create(data)
        console.log('dbData is', dbData);
        return { error: false, msg: 'OK' };
    } catch (e) {
        return { error: true };
    }
}
const deleteOne = async (title) => {
    try {
        console.log('title is', title);
        let dbData = await db.Task.destroy({
            where: {
                title: title
            }
        })
        console.log('dbData is', dbData);
        return { error: false, msg: 'OK' };
    } catch (e) {
        return { error: true };
    }
}
const updateData = async (dbData) => {
    try {
        const title = dbData.title;
        delete dbData.title;
        let dbResult = await db.Task.update(
            dbData, {
            where: {
                title: title
            }
        }

        )
        console.log('dbResult written data is ', dbResult);
        return { error: false, msg: 'OK' };
    } catch (e) {
        console.log('error is ', e);
        return { error: true };
    }
}

module.exports = {
    findAll,
    findOne,
    updateData,
    addOne,
    deleteOne,
}