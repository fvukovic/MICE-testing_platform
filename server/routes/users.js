const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/secret');

//Register route
router.post('/register', (req, res, next) => {
    email: req.body.email;
    username: req.body.username;
    password: req.body.password;

  User.findOne({username: req.body.username})
    .then(user => {
      if(user){
        res.json({success: false, message: 'Username alerady exists'});
      }else {
        User.findOne({email: req.body.email})
        .then(user => {
          if(user){
            res.json({success: false, message: 'Email alerady exists'});
          }else {
            let newUser = new User({
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            });
    
            User.addUser(newUser, (err, user) =>{
              if(err){
                res.json({ success: false, message: 'Failed to register'});
              }else {
                res.json({ success: true, message: 'User registered'});
              }
            });
          }
        });
      } 
  });
});

  //Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, message: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret , {
          expiresIn: 6048000 //1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, message: 'Wrong password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// Search users
router.post('/search', (req, res, next) => {
  const username = req.body.username;

  if(username){
      User.find({username: new RegExp(username)})
      .then(user => {
        if(user.length > 0){
          res.json(user);
        }else{
          return res.json({success: false, message: 'User not found'});
        }
      });
    }else {
      return res.json({success: false, message: 'Please enter username'});
    }
});

module.exports = router;