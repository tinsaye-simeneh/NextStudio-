const Portfolio = require('../Models/PortfolioModel')
const cloudinary = require('../Utils/cloudinary')


exports.CreatePortfolio = async (req,res,next) => {
    
    try {
        let images = [...req.body.project_image];
        let imagesBuffer = [];

        if (images.length > 5) {
            return res.status(400).json({
                status: 'fail',
                messages: 'Maximum allowed number of images is 3.'
            });
        }

        for (let i =0; i < images.length;  i++){
            const result = await cloudinary.uploader.upload(images[i], {
                upload_preset: "NextPortfolio",
                width: 1600
            });

            imagesBuffer.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }
        req.body.project_image = imagesBuffer
        
        const portfolio = await Portfolio.create(req.body)

        res.status(201).send({
            success: true,
            portfolio
        })
    }catch(err) {
        res.status(404).json({
            status: 'fail',
            messages: err.message
        })
    }
}

exports.getPortfolio = async (req,res,next) => {
    const {page} = req.query;
    try{
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT
        const portfolios = await Portfolio.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)

        res.status(200).send({
            status:'success',
            portfolios,
        })

    }catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllPortfolio = async (req,res,next) => {
    try{
        const portfolios = await Portfolio.find().sort({_id: -1})

        res.status(200).send({
            status:'success',
            portfolios,
        })

    }catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updatePortfolios = async (req,res,next) => {
    try{
        const currentPortfolio = await Portfolio.findById(req.params.id)
        const data = {
            company_name: req.body.company_name,
            project_name: req.body.project_name,
            project_category: req.body.project_category,
            project_description1: req.body.project_description1,
            project_date: req.body.project_date,
            project_video: req.body.project_video,
            project_image: currentPortfolio.project_image
        }
            const updatePortfolio = await Portfolio.findByIdAndUpdate(req.params.id, data, {new: true})

            res.status(200).json({
                success: true,
                updatePortfolio
            })
    
    }catch(err){
        console.log(err.message);
        next(err);
    }
}

exports.deletePortfolio = async (req,res,next) => {
    try{
        const portfolios = await Portfolio.findById(req.params.id);
        for (let i =0; i < portfolios.project_image.length;  i++){
            const imgId = portfolios.project_image[i].public_id;
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }
        }
        const rmPortfolio = await Portfolio.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: "Portfolio Deleted",

        })

    }
    catch (error) {
        console.log(error);
        next(error);

    }
}

exports.deletePortfolioImage = async (req,res,next) => {
    try{
        const portfolios = await Portfolio.findOne({_id: req.params.id})

        for (let i =0; i < portfolios.project_image.length;  i++){
            if(portfolios.project_image[i].id === req.params.id1){
                const imgId = portfolios.project_image[i].public_id;
                if(imgId){
                    await cloudinary.uploader.destroy(imgId)
                }
            }
        }
        
        if(portfolios.project_image.length > 1) {
            
            const rmImage = await Portfolio.findOneAndUpdate({_id: req.params.id},{$pull:{project_image : {_id: req.params.id1}}})

            res.status(201).json({
                success: true,
                message: "Portfolio Image Deleted",

            })
        }else{
            res.status(404).json({
                success: false,
                message: 'Can`t delete the last image.'
            })
        }

    }catch(error){
        console.log(error.message);
        next(error);
    }
}

exports.addPortfolioImages = async (req,res,next) => {
    try{
        let images = [...req.body.project_image];
        let imagesBuffer = [];

        const portfolio = await Portfolio.findById(req.params.id);
        if (portfolio.project_image.length >= 5) {
            return res.status(400).send({
                success: false,
                messages: "Cannot add more images. Portfolio already has the maximum allowed images."
            });
        }

        for (let i =0; i < images.length;  i++){
            const result = await cloudinary.uploader.upload(images[i], {
                upload_preset: "NextPortfolio",
                width: 1600
            });

            imagesBuffer.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }
        req.body.project_image = imagesBuffer
        // const PortfolioImage = await cloudinary.uploader.upload(project_image,{
        //     upload_preset: "NextAbout",
        // })
        
        const updatedPortfolio = await Portfolio.findOneAndUpdate({_id: req.params.id},{$push:{project_image : req.body.project_image}})

        res.status(201).send({
            success: true,
            updatedPortfolio
        })
    }catch(err){

    }
}
