const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    company_name:{
        type: String,
        require: [true,'Please Enter Company Name']
    },
    project_name:{
        type:String,
        require: [true, 'Please Enter Project Name']
    },
    project_category: {
        type: String,
        require: [true, 'Please Enter Project Category']
    },
    project_description1: {
        type: String,
        require: [true, 'Please Enter Project Description']
    },
    project_date: {
        type: String,
        require: [true, 'Please Enter Project Date'],
    },
    project_image:[
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    project_video:{
        type: String,
        require: [true, 'Please Enter Project Video Url']
    }
})

const Portfolio = new mongoose.model('Portfolio',portfolioSchema)

module.exports = Portfolio