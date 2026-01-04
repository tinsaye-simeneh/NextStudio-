const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    banner_video:{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
})

const BannerVideo = new mongoose.model('BannerVideo',videoSchema)

module.exports = BannerVideo