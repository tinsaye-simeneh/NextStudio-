const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    intro_image: {
        public_id: {
            type: String,
        
        },
        url: {
            type: String,
            
        }
    },
    about_desc:{
        type: String,
        require: [true, 'please enter About Description']
    }
    
    
})

const About = new mongoose.model('About', aboutSchema)

module.exports = About