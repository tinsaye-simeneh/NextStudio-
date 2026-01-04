const BannerVideo = require('../Models/VideoModel')
const cloudinary = require('../Utils/cloudinary')

exports.CreateVideo = async (req,res,next) => {
    try{

        const {banner_video} = req.body

        const video = await cloudinary.uploader.upload(banner_video, {
            resource_type: "video",
            folder: "NextAbout"
        })

        const BVideo = await BannerVideo.create({
            banner_video:{
                public_id: video.public_id,
                url: video.secure_url
            }
        })

        res.status(201).send({
            success: true,
            BVideo
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err.message
        })
    }
}

exports.getBannerVideo = async (req,res,next) => {
    try{
        const video = await BannerVideo.findById("65609eb451758a77e142670d")
        res.status(201).send({
            status:'success',
            video
            
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err.message
        })
    }
}

exports.UpdateBannerVideo = async (req,res,next) => {
    try {
        const currentBannerVideo = await BannerVideo.findById('65609eb451758a77e142670d');
        const data = {}
        
        if (req.body.banner_video !== '') {
             
             if (req.body.banner_video.public_id !== currentBannerVideo.banner_video.public_id){
                
                const ImgId = currentBannerVideo.banner_video.public_id;
                
                if (ImgId) {
                    await cloudinary.uploader.destroy(ImgId);
                }
                
                const newVideo = await cloudinary.uploader.upload(req.body.banner_video, {
                    resource_type: "video",
                    upload_preset: "NextAbout",
                  }) 
        
                data.banner_video = {
                    public_id: newVideo.public_id,
                    url: newVideo.secure_url
                }
             }
             else{
                data.banner_video = {
                    public_id: currentBannerVideo.banner_video.public_id,
                    url: currentBannerVideo.banner_video.url
                }
             }
           
        }
        const updateBannerV = await BannerVideo.findByIdAndUpdate("65609eb451758a77e142670d", data, { new: true })

        res.status(200).send({
            success: true,
            updateBannerV
        })


    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err.message
        })
    }
}

