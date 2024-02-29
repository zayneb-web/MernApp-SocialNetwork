const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    Name:String,
    description:String,
    media:[],
    
    //foreign Key
    creator:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    }
})

module.exports = mongoose.model('posts',postSchema)