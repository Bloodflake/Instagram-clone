const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
    res.send("hello")
});

router.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        return res.status(422).send("provide all fields")
    }
    // console.log(name, email, password)
    console.log('successfully recieved information')

    User.findOne({email: email}, (err, user) => {
        if(err){
            console.log("internal db lookup error")
            return res.status(500).send("look up err")
        }
        else{
            if(user){
                console.log("user exist")
                return  res.status(422).send("user exist")
            }
            else{
                User.insertMany([{name:name, email:email, password:password}], (err, userInfo) => {
                    if(!err){
                        console.log(userInfo)
                        console.log("successfully saved user")
                        res.status(200).send("successfully saved user")
                    }
                    else{
                        console.log(err)
                        console.log("error in saving user")
                        return res.status(500).send("insertion err")
                    }
                })
            }
        }
    })
    
})



module.exports = router