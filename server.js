const express = require('express');
const devuser = require('./devusermodel');
const jwt = require('jsonwebtoken');
const app = express();
const middleware = require('./middleware');

const mongoose = require('mongoose');

app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("Hello Worldaaaaaaaaaaaaaaa ");
});

app.post('/register',async(req,res)=>{
    try{
        console.log(req.body);
        const {fullname,email,mobile,skill,password,conformpassword} = req.body;
        const exist = await devuser.findOne({email});
        if(exist){
            return res.status(400).send('Password Invalid');
        }
        if(password != conformpassword){
            return res.status(403).send('Password Invalid');
        }
        let newUser =await devuser.create({
            fullname,email,mobile,skill,password,conformpassword
        })
        newUser.save();
        return res.status(200).send('User Registered');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const exists = await devuser.findOne({email});
        if(!exists){
            return res.status(400).send('User Not Exists');
        }
        if(exists.password != password){
            return res.status(400).send('Password Invalid');
        }
        let payload = {
            user : {
                id : exists._id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('/allprofiles',middleware,async(req,res)=>{
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

 
mongoose.connect('mongodb+srv://kanakadurgaprasadp:Prasad123@prasad.mqb92v4.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
    console.log("Connected to DB");
})

app.listen(5000,()=>console.log("Server running..."));
