const sgMail = require('@sendgrid/mail');
const User = require('../models/signin')
const Forgotpassword = require('../models/forgotpass')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

exports.forgotpassword = async (req,res,next)=>{
    try{

        const email = req.body.email;
        const user = await User.findOne({email: email})
        if(user){
            // const id = uuid.v4()
            const forpass = new Forgotpassword({isactive: true, userId: user})
            await forpass.save()
            // user.createForgotPasswordRequest({id: id,isactive: true}).catch((err)=> {throw new Error(err)})
            sgMail.setApiKey(process.env.SIB_API_KEY)
            const msg={
                to: email,
                from: 'sreevardhan259@gmail.com',
                subject: 'Forgot Password',
                text: 'Use the link to reset your password',
                html: `<a href='http://localhost:4000/password/resetpassword/${forpass._id}'>Click here to reset your password</a>`
            }

            sgMail.send(msg)
            .then((response)=>{
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})
            }).catch((err)=>{
                throw new Error(err)
            })
        }else{
            throw new Error('User doesnt exist')
        } 
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}

exports.resetpassword = async (req,res,end)=>{
    try{
        const id = req.params.id;
        const forgotpasswordrequest = await Forgotpassword.findOne({_id: id})
        if(forgotpasswordrequest){
            forgotpasswordrequest.isactive = false;
            await forgotpasswordrequest.save()
            //  forgotpasswordrequest.update({isactive: false})
            res.status(200).send(`<html>
                                <script>
                                    function formsubmitted(e){
                                        e.preventDefault();
                                        console.log('called')
                                    }
                                </script>

                                <form action="/password/updatepassword/${id}" method="get">
                                    <label for="newpassword">Enter New password</label>
                                    <input name="newpassword" type="password" required></input>
                                    <button>reset password</button>
                                </form>
                            </html>`
                            )
          res.end()
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}

exports.updatepassword = async (req,res,next)=>{
    try{
        const { passid } = req.params
        const { newpassword } = req.query
        const forgotpassreq = await Forgotpassword.findOne({ _id : passid })
        const user = await User.findOne({_id: forgotpassreq.userId})
        if(user){
            const saltrounds = 10;
            bcrypt.genSalt(saltrounds, function(err,salt){
                if(err){
                    console.log(err)
                    throw new Error(err)
                }
                bcrypt.hash(newpassword, salt, async function(err,hash){
                    if(err){
                        console.log(err)
                        throw new Error(err)
                    }
                    user.password = hash
                    await user.save()
                    res.status(201).json({message: 'password successfully updated'})
                })
            })
        }else{
            return res.status(404).json({message: 'No use exists'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}
