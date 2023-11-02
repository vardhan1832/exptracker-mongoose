const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgotpasswordSchema = new Schema({
    isactive: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('forgotpassword',forgotpasswordSchema)

// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const forgotpassword = sequelize.define('forgotPasswordRequests',{
//     id:{
//         type: Sequelize.UUID,
//         primaryKey: true,
//         allowNull: false
//     },
//     isactive: Sequelize.BOOLEAN
// })
// module.exports = forgotpassword;