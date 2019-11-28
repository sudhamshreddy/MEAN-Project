const express = require("express");
const mysqlConnection = require("../db/index");
const jwt = require("jsonwebtoken");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/signup",(req,res,next)=>
{  
    const user=req.body;
    var sql = "insert into userdetails (name,email,mobile,password)\
    values(?,?,?,?);" 

mysqlConnection.query(sql,
      [user['name'],user['email'],user['mobile'],user['password']],
      (err,rows,fields)=>
      {
          if(!err)
          {   
             // console.log(rows);
              res.status(201).json({
                  message:"user created successfully",
              })
          }
          else
          {
              console.log(err);
          }
      }
      )
});

router.post("/login", (req,res,next) => {
    const user=req.body;
    var sql = "select * from userDetails where email=? and password=?;" 

mysqlConnection.query(sql,
      [user['email'],user['password']],
      (err,rows,fields)=>
      {
          if(!err)
          {   
             const id = +rows[0].id;
             isAdmin = false;
             if(id === 5)
             {
                isAdmin = true;
             }
             const token = jwt.sign({email:user['email'],userId:rows[0].id},"secret_from_kmit",{expiresIn: '1h'});
             res.status(200).json({
                 token:token,
                 expiresIn:"3600",
                 Admin:isAdmin
             })
          }
          else
          {
            return  res.json({
                  message:"user not found"
              })
          }
      }
      )
}
);

router.get('/:email', (req,res,next) => {
    
    const email = req.params.email;
    console.log(email);
    mysqlConnection.query('select name from userDetails where email=?',[email],(err,rows,fields)=>{
        if(!err)
        {
           res.json(rows);
        }
       else 
          console.log(err)
    })
   //  res.status(200).json({
   //     message: 'organisers fetched successfully',
   //     organisers:organisers
   //     });
     
});

router.put("",checkAuth,(req,res,next)=>{
    const user = req.body;
    const mobile = user.mobile;
    const password = user.password;
    const name = user.name;
    const email = user.email;
    console.log("method called");
    console.log(user);
    console.log(mobile+password+name+email);
    var sql = "update userdetails set name=?,mobile=?,password=? where email=?" 
    
    mysqlConnection.query(sql,
                [name,mobile,password,email],
                (err,rows,fields)=>
               {
                   if(!err)
                   {   
                       
                       res.status(200).json({
                           message:"user updated successfully",
                       })
                   }
                   else
                   {
                       console.log(err);
                   }
               }
               )
 });


module.exports = router;