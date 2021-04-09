const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const dotenv = require("dotenv")

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    console.log(req.headers)
    if(!authorization){
        return res.status(401).send("user must be login")
    }
    else{
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_KEY, (err, payLoad)=> {
            if(err){
                console.log(err)
                return res.status(401).send("user must be login")
            }
            else{
                const {_id} = payLoad
                User.findById(_id, (err, userData)=> {
                    if(!err){
                        req.user = userData
                    }
                    else{
                        return console.log(err)
                    }
                })
            }
            next()
        })
    }
};