const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const deliveryAddress = db.define('deliveryaddress',{
    doorNo:{
        type: DataTypes.INTEGER,
        required: true
    },
    street:{
        type: DataTypes.STRING,
        required: true
    },
    area:{
        type: DataTypes.STRING,
        required: true
    },
    city:{
        type: DataTypes.STRING,
        required: true
    },
    state:{
        type: DataTypes.STRING,
        required: true
    },
    pincode:{
        type: DataTypes.INTEGER,
        required: true
    },
    nearestLandmark:{
        type: DataTypes.STRING,
        required: true
    },

})

module.exports = deliveryAddress;