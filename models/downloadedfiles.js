const mongoose = require('mongoose')
const Schema = mongoose.Schema

const downloadedfilesSchema = new Schema({
    filesdownloaded: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('DownloadedFiles',downloadedfilesSchema)

// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const DownloadedFiles = sequelize.define('downloadedfiles',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     filesdownloaded: Sequelize.STRING
// })

// module.exports = DownloadedFiles;