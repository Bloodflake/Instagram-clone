const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin")

router.post("/createPost",requireLogin, (req, res) => {
    // console.log(req)
    const {title, body} = req.body

    if(!title || !body){
        return res.status(422).send("Provide all field")
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user
    })

    Post.insertMany([post], (err, doc) => {
        if(!err){
            console.log("inserted post successfully in DB")
            console.log(doc)
            res.send(doc)
        }
        else{
            console.log(err)
            return res.status(422).send("insertion in DB err")
        }
    })
});

router.get("/allPost", (req, res) => {
    Post.find({}, (err, allPost) => {
        if(!err){
            // console.log(docs)
            res.json({allPost})
        }
        else{
            console.log(err)
            return res.status(422).send("error in finding post")
        }
    }).populate("postedBy", "_id name")
})

router.get("/myPost",requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id}, (err, myPost) =>{
        if(!err){
            res.json({myPost})
        }
        else{
            console.log(err)
            return res.send("err in looking up post")
        }
    }).populate("postedBy", "_id name")
})

module.exports = router

