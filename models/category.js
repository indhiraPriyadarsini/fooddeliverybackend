const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const category = db.define('category',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cuisine:{
        type: DataTypes.STRING,
        unique:true,
    },
});

module.exports = category;