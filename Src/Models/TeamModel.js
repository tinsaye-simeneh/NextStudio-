const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    full_name: {
        type: String,
        require: [true,'please enter Full Name']
    },
    work_title:{
        type: String,
        require: [true, 'please enter Work Title']
    },
    team_image: {
        public_id: {
            type: String,
        
        },
        url: {
            type: String,
            
        }
    },
})

const Team = new mongoose.model('Team', teamSchema)

module.exports = Team