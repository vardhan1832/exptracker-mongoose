const User = require('../models/signin')
const bcrypt = require('bcrypt')

exports.postUserDetails = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const salts = 10;
        bcrypt.hash(password,salts, (err,hash)=>{
            console.log(hash)
            const user = new User({
                name: name,
                email:email,
                totalexpense:0,
                password: hash
            })
            // console.log(user)
            user.save()
            .then(result=>{
                res.status(201).json({message: 'success'})
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}