
const Sequelize = require('sequelize');
const db = new Sequelize('fooddb','root','mypass', {
    host:'localhost',
    dialect:'mysql',
    define:{
        timestamps: false,
        freezeTableName: true  
    }
});

module.exports=db;