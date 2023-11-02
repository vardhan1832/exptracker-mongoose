const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    totalexpense: {
        type: Number
    },
    password:{
        type: String,
        required: true
    },
    isPremiumUser: {
        type: Boolean
    }
})

module.exports = mongoose.model('User',userSchema)
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const User = sequelize.define('User',{
//     id:{
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     totalexpense:{
//         type: Sequelize.DOUBLE
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     isPremiumUser: Sequelize.BOOLEAN
// })
// module.exports = User;