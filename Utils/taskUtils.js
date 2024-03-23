var fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '..', '/db.json');

const findAll = async () => {
    let dbData = await JSON.parse(fs.readFileSync(dbFile));
    console.log('dbData is', dbData);
    return dbData
}

const findOne = async (title) => {
    let dbData = await JSON.parse(fs.readFileSync(dbFile));
    console.log('dbData is', dbData);
    return dbData[title];
}
const updateData = async (dbData) => {
    try {
        let dbResult = await fs.writeFileSync(dbFile, JSON.stringify(dbData), 'utf-8');
        console.log('dbResult written data is ', dbResult);
        return { error: false, msg: 'OK' };
    } catch (e) {
        return { error: true };
    }
}

module.exports = {
    findAll,
    findOne,
    updateData
}