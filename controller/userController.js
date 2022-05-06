const res = require('express/lib/response')
const user = require('../models/user')

function save(req,res){
    const post={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    user.create(post)
    .then(result=>{
        res.status(201).jason({
            message:'user added successfully',
            post: result
        });
    })
    .catch(error=>{
        res.status(500).json({
            message:'could not register',
            error: error
        });
    });
}

module.exports={ save: save}