const express = require('express');
const app = express();
var session = require('express-session');
const bodyParser = require('body-parser');
const user = require('./models/user');
const bcrypt = require('bcrypt');
const category = require('./models/category');
const hotelData = require('./models/hotelData');
const menuDb = require('./models/menuDb');
const passport = require('passport');
const cors =  require('cors');
const deliveryAddress = require('./models/addAddress');
// const tokenList = {}


app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const jwt= require('jsonwebtoken')
require('dotenv').config()
const {append} = require('express/lib/response')
const res = require('express/lib/response')


generateJwt = user => {
    return jwt.sign({
        iss:'indra',
        sub: user.id,
        iat: new Date().getTime(),
        expiresIn:'2m'
    },process.env.SECRET);
}
app.get('/',(req,res)=>{
    res.send("welcome ")
})

app.post('/register',async(req,res) => {

    const {username, email, password} = req.body;

    const checkemail = (await user.findOne({ where: {email: email} }))? true:false;

    if(checkemail) {
        res.status(404).send("User exists!") }
    else { 
        const hidepassword = await bcrypt.hash(password, 5);

        const UserData = await user.create({username:username, 
            email:email, password:hidepassword});
        res.status(200).send("Registered successfully...");
    } 

})

app.post('/Address',passport.authenticate('authtoken',{session:false}),async(req,res)=>{
    const {doorNo, street, area, city, state, pincode, nearestLandmark } = req.body;
    const addAddress = await deliveryAddress.create({
        doorNo: doorNo, 
        street: street,
        area: area,
        city: city,
        state: state,
        pincode: pincode,
        nearestLandmark: nearestLandmark,
    });
    res.status(200).send("address saved!")
})

app.post('/login', async(req,res) => { 
    const {email, password}= req.body;
    const user1 = await user.findOne({where: {email: email}});
    if(user1!=null) {
        bcrypt.compare(password, user1.password).then(ValidUser => {
            if(ValidUser)
                res.status(200).send("login successful")
            else
                res.status(404).send('User not found !')    
        })
    }
})

app.get('/category', async(req,res) => { 
    const cat1 = await category.findAll();
    res.status(200).send(cat1);
})

app.get('/hotelData', async(req,res) => { 
    const hotel = await hotelData.findAll();
    res.send(hotel);
})

app.get('/menuDb', async(req,res) => { 
    const menu = await menuDb.findAll();
    res.status(200).send(menu);
})

app.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
});