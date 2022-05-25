const jwt = require('jsonwebtoken')
require('dotenv').config();


generateRefreshToken = user1 => {
    return jwt.sign({
        iss:'indra',
        sub: user1.id,
        iat: new Date().getTime(),
        expiresIn:'1d'
    },process.env.SECRET);
}

module.exports ={generateRefreshToken} ;