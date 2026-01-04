const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote_text:{
        type: String,
        require: [true,'please enter Quote Text']
    }
})

const Quote = new mongoose.model('Quote', quoteSchema)

module.exports = Quote