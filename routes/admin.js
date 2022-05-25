const express = require('express');
const admin = express.Router();
const admin = require('../models/admin');
const category = require('./models/category');
const hotelData = require('./models/hotelData');
const menuDb = require('./models/menuDb');
const cors = require('cors');
const passport = require('passport');
const category = require('../models/category');
const refreshtoken = require('../tokens/refreshToken')
const authToken = require('../tokens/authToken')
require('../myPassport');

admin.use(express.json())
admin.use(cors())

app.get('/',(req,res)=>{
    res.send("welcome admin")
})


admin.post('/adminLogin', async(req,res) => { 
    const {email, password}= req.body;
    console.log(email)
    console.log(password)
    const admin1 = await admin.findOne({where: {email: email}});
   
    if(admin1) {
       
                const jwtToken  = authToken.generateJwt(user1)
                const refreshToken  = refreshtoken.generateRefreshToken(user1)
                return  res.status(200).json({ authToken: jwtToken,refreshToken:refreshToken})
            }
              
            else
                res.status(404).send("User not found")    
        })

    


admin.delete('/deleteuser/:id', passport.authenticate('accesstoken', { session: false }), async (req, res) => {

    user.destroy({ where: { id: req.params.id } })
        .then(msg => {
            if (msg == 1) res.status(200).json({ "Message": "User account deleted successfully!" })
            else {
                res.status(400).json({"Message":`Cannot delete user account with id ${req.params.id}. Maybe user not found or req.body is empty`})
            }
    })
})

admin.post('/addHotel', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const { categoryType, hotelName, hotelUrl } = req.body;

    const checkHotel = (await hotelData.findOne({ where: { categoryType: categoryType, hotelName: hotelName} })) ? true : false;

    if (checkHotel) {
        res.send('Already added this hotel')
    }
    else {
        const addHotel = await hotelData.create({
            categoryType: categoryType, hotelName: hotelName, hotelUrl: hotelUrl
        });
        res.status(200).json({ "message": "Hotel added successfully..." });
    }

})