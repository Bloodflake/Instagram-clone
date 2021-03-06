const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(`mongodb+srv://sumit:${process.env.PWSSRD}@cluster0.5zven.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on("connected", ()=>{
    console.log("connected to DB")
});

mongoose.connection.on("error", (err)=>{
    console.log("error", err)
})

require("./models/user")
require("./models/post")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"))

// app.route('/')
// .get(function(req, res){
//     res.send("hello world");
// })


app.listen(port, () => console.log(`Server running on port ${port} ${process.env.USER}`));