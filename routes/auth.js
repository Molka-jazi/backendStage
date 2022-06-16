const router = require("./apiRouter");
const router =require('../moodels/users');
const express = require("express").Router();


router.post('register',async(req,res) => {
    res.send('Register');
    const user=new user({
id: req.body.id,
text: req.body.text,
    });

try{
const savedUser = await user.save();

}catch(err){
    req.statusCode(400).send(err);
}
});


module.exports =router; 