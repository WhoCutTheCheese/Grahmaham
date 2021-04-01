  
const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    guildName: String, 
    prefix: String,
})

module.exports = mongoose.model('prefix', Schema)