const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('expense',expenseSchema)

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const expense= sequelize.define('expenses',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     amount:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     category:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// module.exports=expense;