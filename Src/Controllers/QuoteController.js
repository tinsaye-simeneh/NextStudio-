const Quote = require('../Models/QuoteModel')

exports.CreateQuote = async (req,res,next) => {
    try{
        const newQuote = await Quote.create(req.body)
        res.status(201).json({
            success: true,
            newQuote
        })
    }catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.getQuote = async (req,res,next) => {
    try{
        const quote = await Quote.findById("656440999a3ea1c567f43706")
        res.status(201).send({
            success: true,
            quote
        })
    }catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateQuote = async (req,res,next) => {
    try{
        const quote = await Quote.findByIdAndUpdate("656440999a3ea1c567f43706",req.body,{
            new:true,
            runValidation: true
        })
        res.status(200).json({
            success:true,
            quote
        })
    }catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })
    } 
}