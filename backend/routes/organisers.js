const express = require("express");
const mysqlConnection = require("../db/index");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post('',checkAuth,(req,res,next) =>{

    const organiser = req.body;
    const defaultrating = 5;
     const engagementevent = organiser['events'].includes('engagement');
     const marriageevent = organiser['events'].includes('marriage');
     const receptionevent = organiser['events'].includes('reception');
     const birthdayevent = organiser['events'].includes('birthday');
     const corporateevents = organiser['events'].includes('corporateevents');
     const creator = 5;
     
    
     var sql = "insert into organiserdetails (name,description,imagePath,websiteLink,location,minimumbudget,engagamentevent,weddingevent,receptionevent,birthdayevent,corporatevent,size,email,rating,creator)\
              values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);" 
    
              
     mysqlConnection.query(sql,
                [organiser['name'],organiser['description'],organiser['imagePath'],organiser['websiteLink'],organiser['location'],organiser['minimumbudget'],engagementevent,marriageevent,receptionevent,birthdayevent,corporateevents,organiser['size'],organiser['email'],defaultrating,creator],
                (err,rows,fields) =>
                {
                    if(!err)
                    {   
                       // console.log(rows);
                        res.status(201).json({
                            message:"organiser added successfully",
                        })
                    }
                    else
                    {
                        console.log(err);
                    }
                }
                )
     
    
    });
     router.put("/:id",checkAuth,(req,res,next)=>{
        const organiser = req.body;
        const id = req.params.id;
        const engagementevent = organiser['events'].includes('engagement');
        const marriageevent = organiser['events'].includes('marriage');
        const receptionevent = organiser['events'].includes('reception');
        const birthdayevent = organiser['events'].includes('birthday');
        const corporateevents = organiser['events'].includes('corporateevents');
       
        var sql = "update organiserdetails set name=?,description=?,imagePath=?,websiteLink=?,location=?,minimumbudget=?,engagamentevent=?,weddingevent=?,receptionevent=?,birthdayevent=?,corporatevent=?,size=?,email=? \
                  where id=?;" 
        
        mysqlConnection.query(sql,
                   [organiser['name'],organiser['description'],organiser['imagePath'],organiser['websiteLink'],organiser['location'],organiser['minimumbudget'],engagementevent,marriageevent,receptionevent,birthdayevent,corporateevents,organiser['size'],organiser['email'],id],
                   (err,rows,fields)=>
                   {
                       if(!err)
                       {   
                           console.log("database");
                           res.status(200).json({
                               message:"organiser updated successfully",
                           })
                       }
                       else
                       {
                           console.log(err);
                       }
                   }
                   )
     });
    
     router.get('', (req,res,next) => {
        
       

         mysqlConnection.query('select * from organiserdetails',(err,rows,fields)=>{
             if(!err)
             {  
                
               // console.log(rows[0]['name']);
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
     router.delete('/:id',(req,res,next) => {
        const id = req.params.id;
        checkAuth,
        mysqlConnection.query('delete from organiserdetails where id=?',[id],(err,rows,fields)=>{
            if(!err)
            {
              res.json({
                  message:"deleted successfully"
              });
            }
           else 
              console.log(err)
        })
     })

module.exports = router;