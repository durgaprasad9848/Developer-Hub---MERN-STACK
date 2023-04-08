const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kanakadurgaprasadp:Prasad123@prasad.mqb92v4.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
    console.log("Connected to DB");
})

app.get('/',(req,res)=>{
    return res.send("Hello World");
});

app.listen(5000,()=>console.log("Server running..."));