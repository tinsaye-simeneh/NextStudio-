const mongoose = require('mongoose')

module.exports = function () { 
    const DB = 'mongodb+srv://cgetenet:PassMeNext2024@cluster0.lcpzehj.mongodb.net/?retryWrites=true&w=majority'
    
    mongoose.connect(DB,{
        useNewUrlParser: true,
	    useUnifiedTopology: true
    }).then(() => console.log(`Connected to ${DB}...`))

}