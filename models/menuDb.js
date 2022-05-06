const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const menuDb = db.define('menudb',{

    hotelId:{
        type: DataTypes.INTEGER,
    },
    hotelName:{
        type: DataTypes.STRING,
        required: true
    },
    dishes:{  
        type: DataTypes.STRING,
        required: true
    },
    price:{
        type: DataTypes.INTEGER,
        required: true
    },

});

module.exports = menuDb;