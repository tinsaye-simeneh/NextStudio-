const Admin = require("../Models/AdminModel")
const jwt = require('jsonwebtoken')
const AppError = require("../Utils/AppError")


exports.singup = async (req,res,next)=>{
    try{
        const newAdmin = await Admin.create(req.body)
        res.status(201).send({
            newAdmin
        })
    }catch(err){
        res.status(404).send({
            status: 'fail',
            message: err
        })
    }
}

exports.login = async (req,res,next) =>{
  try{
    const {username, password} = req.body 
    if(!username || !password){
      
        throw new AppError('Please provide email and password',400)

    }
    const user = await Admin.findOne({ username }).select('+password')
    if(!user || !(await user.correctPassword(password, user.password))){
        
        throw new AppError('Incorrect email or password',401)
    }
    const token = jwt.sign({id:user.id},'bimer-business-group-web-application',{
      expiresIn: '12hr',
    })
        res.status(200).send({
            status: 'success',
            messages: 'logged in successfuly',
            token,
            user
            
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            messages: err.message
        })
    }
}

exports.getAdmin = async (req,res,next) => {
    res.status(200).json(req.user)
} 



exports.updatePassword = async (req, res, next) => {
    try{
        const admin = await Admin.findById(req.user.id).select('+password');
  
        if (!(await admin.correctPassword(req.body.passwordCurrent, admin.password))) {
            throw new AppError("Your current password is wrong",401)
        }
        
        admin.password = req.body.password;
        await admin.save();
    
        const token = jwt.sign({id:admin.id},'bimer-business-group-web-application')
        res.status(200).send({
            status: 'success',
            messages: 'Password updated Successfuly',
            token
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            messages: err.message
        })
    }
};