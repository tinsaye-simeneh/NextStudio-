class AppError extends Error {
    constructor(messages, statusCode) {
      super(messages);
      this.statusCode = statusCode;
      this.isOperational = true

      Error.captureStackTrace(this,this.constructor)
    }
  }
  
module.exports = AppError;