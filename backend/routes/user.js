const express =  require('express');
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const router = express.Router();

router.post('/create', (req, res) => {

      bcrypt.hash(req.body.password, 10)
      .then(hash =>{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: req.body.role,
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
          message:"auth failed"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password,user.password)
    })
     .then(result =>{
      if(!result ){
        return res.status(401).json({
          message:"auth failed"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "this-is-the-secret-key",
        {expiresIn: 120000}
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





// router.post('/login', async (req, res) => {
//     const creds = new User({
//         email : req.body.email,
//         password : req.body.password,})
  
//     try {
//       console.log('hii'+creds)
//       const user = await User.findOne(creds.email);
//       console.log('hii'+creds)
//       if (!user) {
//         res.status(401).json({ error: 'Invalid username or password' });
//         return;
//       }
  
//       // User exists, generate JWT token
//       const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
  
//       res.json({ token });
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ error: 'server error' });
//     }
//   });


module.exports = router;