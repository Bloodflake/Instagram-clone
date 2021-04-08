const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const customMidleware = function(req, res, next){
    console.log("midleware")
    next()
}

// app.use(customMidleware);

app.route('/')
.get(function(req, res){
    res.send("hello world");
})


app.route("/about")
.get(customMidleware,function(req, res){
    res.send("About Page")
})

app.listen(port, () => console.log(`Server running on port ${port}`));