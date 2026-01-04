const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    client_image: {
        public_id: {
            type: String,
        
        },
        url: {
            type: String,
            
        }
    },
})

const Client = new mongoose.model('Client', clientSchema)

module.exports = Client