'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {

        static associate(models) {

        }
    }
    Task.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        description: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            values: ['TODO', 'INPROGRESS', 'DONE']
        }
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};
