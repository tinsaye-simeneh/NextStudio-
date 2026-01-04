const cloudinaryModule = require('cloudinary');

const cloudinary = cloudinaryModule.v2
cloudinary.config({ 
    cloud_name:'dtlrrlpag', 
    api_key:'312965896819612', 
    api_secret:'BVnhkmPHRcK84BZMtzWWnxGDOP4'
  });

module.exports= cloudinary;