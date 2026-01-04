const Client = require('../Models/ClientModel')
const cloudinary = require('../Utils/cloudinary')


exports.CreateClient = async (req,res,next) => {
    const { client_image } = req.body

    try {
        const image = await cloudinary.uploader.upload(client_image, {
            upload_preset: "NextClient",
            // width: 300,
            // crop: "scale"
        })
        const clients = await Client.create({
            client_image: {
                public_id: image.public_id,
                url: image.secure_url
            },
        });
        res.status(201).json({
            success: true,
            clients
        })

    } catch (error) {
        console.log(error);
        next(error);

    }
}

exports.getAllClients = async (req,res,next) => {
    try{
        const client = await Client.find().sort({_id: -1})

        res.status(200).send({
            success:true,
            client
        })
    }catch(err){
        res.status(404).json({
            success:false,
            messages: err.message
        })
    }
}


exports.deleteClient = async (req, res, next) => {

    try {
        const client = await Client.findById(req.params.id);
        //retrieve current image ID
        const imgId = client.client_image.public_id;
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }

        const rmProduct = await Client.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: "Client Deleted",

        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}