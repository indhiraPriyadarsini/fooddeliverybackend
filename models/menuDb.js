const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const menuDb = db.define('menudb',{

    id:{
        
        type: DataTypes.INTEGER,
        primaryKey: true
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
    category:{
        type: DataTypes.STRING,
        required: true

    }

});

module.exports = menuDb;