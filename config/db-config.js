
const Sequelize = require('sequelize');
const db = new Sequelize('fooddb','admin','fooddb2601', {
    host:'fooddb.c33vfgmfefmv.us-east-1.rds.amazonaws.com',
    dialect:'mysql',
    define:{
        timestamps: false,
        freezeTableName: true  
    }
});

module.exports=db;