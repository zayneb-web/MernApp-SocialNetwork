const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    bio: String,
    picture: String,
    birthDate: Date
});
//('users',userSchema) = (esm table bsh tkoun f BD / esm schema eli fyh attributs)
module.exports = mongoose.model('users', userSchema)







