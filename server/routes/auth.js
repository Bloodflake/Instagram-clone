const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello")
});

router.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"provide all fields"})
    }
    // console.log(name, email, password)
    res.json({ message: 'success' });
})



module.exports = router