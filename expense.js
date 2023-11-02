const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose')

const express = require('express');
const bodyParser = require('body-parser');
const helmet  = require('helmet')
const morgan = require('morgan')
require('dotenv').config();

// const sequelize = require('./util/database')

// const User = require('./models/signin')
// const Expense = require('./models/expenseTracker')
// const Order = require('./models/order')
// const ForgotPasswordRequests = require('./models/forgotpass')
// const DownloadedFiles = require('./models/downloadedfiles')

var cors = require('cors')

const app = express();
app.use(cors())

const signinroutes = require('./routes/signin')
const loginroutes = require('./routes/login')
const expenseroutes = require('./routes/expenseTracker')
const purchaseroutes = require('./routes/purchase')
const premiumfeatureroutes = require('./routes/premiumfeature')

const filestreamaccess = fs.createWriteStream(path.join(__dirname,'access.log'),{flags: 'a'})

app.use(morgan('combined',{stream: filestreamaccess}))

app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',signinroutes);
app.use(loginroutes)
app.use('/user',expenseroutes)
app.use(purchaseroutes)
app.use(premiumfeatureroutes)

// app.use((req,res)=>{
//     console.log('url',req.url)
//     console.log('hello everyoone')
//     res.sendFile(path.join(__dirname,`views/${req.url}`))
// })

//console.log(process.env.NODE_ENV)

// User.hasMany(Expense)
// Expense.belongsTo(User)

// User.hasMany(Order)
// Order.belongsTo(User)

// User.hasMany(ForgotPasswordRequests)
// ForgotPasswordRequests.belongsTo(User)

// User.hasMany(DownloadedFiles)
// DownloadedFiles.belongsTo(User)

mongoose
    .connect(
         'mongodb+srv://vardhan:nikenduku@vardhan.zeflxst.mongodb.net/expense?retryWrites=true&w=majority'
     )
     .then(res=>{
        console.log('connected')
        app.listen(4000)
     })
     .catch(err=>{
            console.log(err)
     })

// sequelize.sync()
// .then(res=>{
//     // console.log(res)
//     app.listen(process.env.PORT || 4000)
// })
// .catch(err=>{
//     console.log(err);
// })


