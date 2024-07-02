const express =  require('express');
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post('/create', (req, res) => {
    let totalUsers=0;
    // let user = User.findOne({ email: req.body.email });
    // if (user) {
    //   return res.status(400).json({ message: 'User already exists'+ user });
    // }
      bcrypt.hash(req.body.password, 10)
      .then(hash =>{
        ++totalUsers;
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: req.body.role,
          userId:totalUsers
        });
        const savedUser = newUser.save()
        .then(result=>{
          res.status(201).json({
            message: 'created user',
            result: result
          });
        })
        .catch(err=>{
          res.status(500).json({
            error:err
          })
        })
      })
  });


  router.post("/login", (req,res,next)=> {
    User.findOne( {email:req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message:"Invalid Email"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password,user.password)
    })
     .then(result =>{
      if(!result ){
        return res.status(401).json({
          message:"Wrong Password"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "this-is-the-secret-key",
        {expiresIn: '10m'}
      );
      res.status(200).json({
        token : token
      });
     })
     .catch(err=> {
      return res.status(401).json({
        message:"auth failed"
      });
     })
  })



  router.post('/logout', checkAuth, (req, res) => {
  
    res.status(200).send({ auth: false, token: null, message: 'Logout successful' });
  });



module.exports = router;