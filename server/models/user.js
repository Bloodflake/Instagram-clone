const mongoose = require("mongoose");

const userSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        ype: String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model("User", userSchema);