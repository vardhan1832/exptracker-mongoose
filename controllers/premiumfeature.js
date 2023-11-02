const Order = require('../models/order')
const User = require('../models/signin')
const Expenses = require('../models/expenseTracker')
const DownloadedFiles = require('../models/downloadedfiles')
const AWS = require('aws-sdk')

const getleaderboard = async (req,res,next)=>{
    try{
        // const leaderboardUsers = await User.findAll({
        //     attributes: ['name','totalexpense'],
        //     order: [['totalexpense' , 'DESC']]
        // })
        const leaderboardUsers = await User.find({}, ['name', 'totalexpense']).sort({ totalexpense: -1 });
        res.status(201).json(leaderboardUsers)
    }catch(err){
        console.log(err)
        res.status(405).json('error')
    }
}
function uploadToS3(data , file){
    const BUCKET_NAME = 'expensetrackerfstack'
    const IAM_USER_KEY = 'AKIA3VQMIISGFXZVR54Q'
    const IAM_USER_SECRET = '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'

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })
   
    let params={
        Bucket: BUCKET_NAME,
        Key: file,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise ((resolve,reject)=>{
        s3bucket.upload(params,(err,data)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            else{
               // console.log(data)
               resolve(data.Location) ;
            }
        })
    })
}
const downloadreport = async (req,res,next)=>{
    try{
        const expenses = await Expenses.find({userId: req.user})
        // const expenses = await req.user.getExpenses()
        //console.log(expenses)
        const stringifiedExpenses = JSON.stringify(expenses)
        const filename = `Expenses${req.user._id}/${new Date()}.txt`
        const fileURL= await uploadToS3(stringifiedExpenses,filename)
        const downloadedfile = new DownloadedFiles({
            filesdownloaded: fileURL,
            userId: req.user
        })
        await downloadedfile.save()
        // await req.user.createDownloadedfile({filesdownloaded: fileURL})
        //console.log(fileURL)
        res.status(201).json(fileURL)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}
const displayreport = async (req,res,next)=>{
    try{
        const files = await DownloadedFiles.find({ userId: req.user._id})
        res.status(201).json(files);
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
}

module.exports = {
    getleaderboard,
    downloadreport,
    displayreport
}