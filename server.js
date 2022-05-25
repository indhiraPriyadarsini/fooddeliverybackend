const express = require('express');
const app = express();
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
const user = require('./models/user');
const bcrypt = require('bcrypt');
const category = require('./models/category');
const hotelData = require('./models/hotelData');
const menuDb = require('./models/menuDb');
const cors =  require('cors');
const deliveryAddress = require('./models/addAddress');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const jwt= require('jsonwebtoken')
require('dotenv').config()
const {append} = require('express/lib/response')
const passport = require('passport');
require('./myPassport.js');
const res = require('express/lib/response')
const authToken = require('./tokens/authToken')
const refreshtoken = require('./tokens/refreshToken')


app.get('/',(req,res)=>{
    res.send("welcome ")
})

app.post('/token',passport.authenticate('refresh',{session:false}),async(req,res)=>{
    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];
    const userFound = {id:req.user.sub}
    const jwtToken = authToken.generateJwt(userFound)
    console.log(req.user.sub)
    res.status(201).json({ jwtToken: jwtToken })
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
        res.status(200).send(UserData);
    } 

})

app.post('/address',async(req,res)=>{
    const {user_id,doorNo, street, area, city, state, pincode, nearestLandmark } = req.body;
    const addAddress = await deliveryAddress.create({
        user_id:user_id,
        doorNo: doorNo, 
        street: street,
        area: area,
        city: city,
        state: state,
        pincode: pincode,
        nearestLandmark: nearestLandmark,
    });
    res.status(200).send(addAddress)
})

app.post('/login', async(req,res) => { 
    const {email, password}= req.body;
    console.log(email)
    console.log(password)
    const user1 = await user.findOne({where: {email: email}});
   
    if(user1!=null) {
        bcrypt.compare(password, user1.password).then(ValidUser => {
            if(ValidUser){
                const jwtToken  = authToken.generateJwt(user1)
                console.log(jwtToken)
                const refreshToken  = refreshtoken.generateRefreshToken(user1)
                console.log(refreshToken)
                return  res.status(200).json({ authToken: jwtToken,refreshToken:refreshToken})
            }
              
            else
                res.status(404).send("User not found")    
        })

    }
})

app.get('/category', async(req,res) => { 
    const cat1 = await category.findAll();
    res.status(200).send(cat1);
})


app.get('/hotelData/:category', async(req,res) => { 
    const categoryHotel = await hotelData.findAll({where: {categoryType: req.params.category}});
    if(categoryHotel!=null)
    res.status(200).send(categoryHotel);
    else
    res.status(404).error(err)  
})

// app.post('/hoteldata/addhotel', async(req,res) => {

//     const {hotelName,categoryId , categoryType} = req.body;

//     const checkHotel = (await hotelDb.findOne({ where: {hotelName: hotelName} }))? true:false;

//     if(checkHotel) {
//         const disp = await hotelDb.findAll();
//         res.send(disp);
//     }
//     else { 
//         const UserData = await hotelDb.create({hotelName:hotelName, categoryId:categoryId, 
//             categoryType:categoryType});
//         const disp = await hotelDb.findAll();
//         res.send(disp);
//     } 

// })

app.get('/:category/:hotelName', async(req,res) => { 
    const hotelMenu = await menuDb.findAll({where:{category: req.params.category,hotelName: req.params.hotelName}});
    // console.log(hotelMenu)
    if(hotelMenu!=null)
    res.status(200).send(hotelMenu);
    else
    res.status(404).error(err)  
})

app.get('/:category/:hotelName/:dishes',async(req,res)=>{
    const findDishes=(await menuDb.findAll({where: {hotelName: req.params.hotelName , dishes:req.params.dishes} }));

    if(findDishes!=null)
    {
        res.send(findDishes)
    }
    else
    res.status(404).error(err)  
})

app.listen(3000,()=>{
    console.log("server running at http://localhost:3000");
});