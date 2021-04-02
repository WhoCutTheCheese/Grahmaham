  
const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    guildName: String, 
    prefix: String,
    color: String,
    premium: Boolean,
    tokens: Number,
})

module.exports = mongoose.model('prefix', Schema)