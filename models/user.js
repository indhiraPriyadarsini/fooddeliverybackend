const {DataTypes} = require('sequelize');
const db = require('../config/db-config')

const user = db.define('userss',{
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        unique:true,
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
        
    },
    password:{
        type: DataTypes.STRING,
        notEmpty:true
    }
});

module.exports = user