const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    street:{
        type: String,
        require: [true,'please enter Street']
    },
    building:{
        type: String,
        require: [true,'please enter Building']
    },
    floor:{
        type:String,
        require: [true,'please enter Floor']
    },
    phonenumber_1:{
        type: String,
        require: [true,'please enter Phone Number 1']
    },
    phonenumber_2:{
        type: String,
        require: [true,' please enter Phone Number 2']
    },
    email:{
        type: String,
        require: [true, 'please enter Email Address']
    },
    instagram_link:{
        type: String,
        require: [true, 'please enter Instagram Link']
    },
    facebook_link: {
        type: String,
        require: [true, 'please enter Facebook Link']
    },
    twitter_link: {
        type: String,
        require: [true, 'please enter Twitter Link']
    },
    youtube_link: {
        type: String,
        require: [true, 'please enter Youtube Link']
    }
})


const Contact = new mongoose.model('Contact', contactSchema)

module.exports = Contact