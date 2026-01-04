const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    service_title:{
        type: String,
        require: [true,'please enter Service Title']
    },
    service_description:{
        type: String,
        require: [true,'please enter Service Description']
    },
    service_icon:{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
})

const Service = new mongoose.model('Service',serviceSchema)
module.exports = Service