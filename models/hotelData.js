const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const hotelData = db.define('hoteldata',{
    hotelId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hotelName:{
        type: DataTypes.STRING,
        required: true
    },
    categoryId:{
        type: DataTypes.INTEGER,
        required: true
    },
    categoryType:{
        type: DataTypes.STRING,
        required: true
    },
    hotelUrl:{
        type: DataTypes.STRING,
        required: true

    }
});

module.exports = hotelData;
