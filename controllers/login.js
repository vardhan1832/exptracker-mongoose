const User = require('../models/signin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//require('dotenv').config();

function generateAccessToken(id,name,isPremiumUser){
    return jwt.sign({UserId: id, name: name ,isPremiumUser}, process.env.SECRET_TOKEN)
}

exports.loginUser = async (req,res,next)=>{
    try{
        let usermail = await User.find({email: req.body.email})
        if(usermail === undefined || usermail.length===0){
            res.status(404).json({message: 'Email doesnot exits'})
        }else if(usermail.length>0){
            bcrypt.compare(req.body.password , usermail[0].password, (err,result)=>{
                if(err){
                    throw new Error('something went wrong')
                }else{
                    if(result){
                        res.status(201).json({message: 'login successfull',token: generateAccessToken(usermail[0]._id,usermail[0].name,usermail[0].isPremiumUser), isPremiumUser: usermail[0].isPremiumUser })
                    }else{
                        res.status(400).json({message: 'password incorrect'})
                    }
                }
            })   
        }
    }
    catch(err){
        res.status(500).json({message: err})
    }
}