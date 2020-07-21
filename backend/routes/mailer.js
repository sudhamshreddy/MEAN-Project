const express = require("express");
var nodemailer = require('nodemailer');
const router = express.Router();


router.post( "",(req,res,next) =>
{   
    const otheremail = req.body.email;
    const reply = req.body.content;
    const myemail = 'dummyforproject.123@gmail.com';
    const mypassword = 'nirvanaadmin@123';
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'email',
      pass: 'password'
    }
  });
  
  var mailOptions = {
    from: myemail,
    to: otheremail,
    subject: 'Message from Admin@Nirvana',
    text: reply
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
       res.json({
           message: 'Email sent successfully'
       })
    }
  })});

  module.exports = router;
