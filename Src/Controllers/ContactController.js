const Contact = require('../Models/ContactModel')

exports.CreateContact = async (req,res,next) => {
    try{
        const newContact = await Contact.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                newContact
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getContact = async (req,res,next) => {
    try{
        const contact = await Contact.findById("6565e0b5801a008224d701a3")
        res.status(201).send({
            status:'success',
            contact
            
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}

exports.updateContact = async (req,res,next) => {
    try{
        const contact = await Contact.findByIdAndUpdate("6565e0b5801a008224d701a3",req.body,{
            new:true,
            runValidation: true
        })
        res.status(200).json({
            status: 'success',
            data:{
                contact
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}