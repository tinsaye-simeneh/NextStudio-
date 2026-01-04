const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true, 'please enter username'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'please enter password']
    }
})

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

AdminSchema.methods.correctPassword = async function (candidatePassword, userpassword) {
    return await bcrypt.compare(candidatePassword, userpassword)
}

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin