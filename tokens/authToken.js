const jwt = require('jsonwebtoken')
require('dotenv').config();


generateJwt = user1 => {
    return jwt.sign({
        iss:'indra',
        sub: user1.id,
        iat: new Date().getTime(),
        expiresIn:'5m'
    },"secret");
}

module.exports ={generateJwt} ;