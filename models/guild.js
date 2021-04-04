  
const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    guildName: String, 
    prefix: String,
    color: String,
})

module.exports = mongoose.model('guild', Schema)