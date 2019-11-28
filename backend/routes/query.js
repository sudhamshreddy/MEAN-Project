const express = require("express");
const mysqlConnection = require("../db/index");
const router = express.Router();

router.post("",(req,res,next)=>
{
    
    const query=req.body;
    var sql = "insert into queryDetails(email,title,content)\
    values(?,?,?);" 

mysqlConnection.query(sql,
      [query['email'],query['title'],query['content']],
      (err,rows,fields)=>
      {
          if(!err)
          {   
             // console.log(rows);
              res.status(201).json({
                  message:"Query Posted successfully",
              })
          }
          else
          {
              console.log(err);
          }
      }
      )
});

router.get("", (req,res,next) => {
  
    var sql = "select email,title,content from queryDetails ";
    mysqlConnection.query(sql,
        (err,rows,fields)=>
      {   
          if(!err)
          {   
              //console.log(rows);
              res.status(201).json({
                  query:rows
              });
          }
          else
          {
              console.log(err);
          }
      }
        
        )
   
});

module.exports = router;