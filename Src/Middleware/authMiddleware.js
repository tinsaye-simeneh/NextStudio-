const jwt = require('jsonwebtoken')
const Admin = require('../Models/AdminModel')
const AppError = require('../Utils/AppError')
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
    try{
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
  
      if (!token) {
        throw new AppError('You are not logged in! Please log in to get access.',401)
      }
  
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(token, 'bimer-business-group-web-application');
  
      // 3) Check if user still exists
      const currentUser = await Admin.findById(decoded.id);
      if (!currentUser) {
        throw new AppError('The user belonging to this token does no longer exist.',401)    
        
      }
      req.user = currentUser;
      next();
    }catch(err){
      res.status(404).json({
          status: 'fail',
          messages: err.message
      })
  }
  }
