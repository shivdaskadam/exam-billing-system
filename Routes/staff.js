var express=require("express");
var app=express.Router({mergeParams:true});
var staffdata = require("../models/staffdata");
var combinedata = require("../models/combinedata");
var middleware =require("../middleware/logic");


app.get("/:year/:exam/:id/:type",function(req, res) {
    
    res.render("staff/form",{year:req.params.year, exam : req.params.exam ,type : req.params.type,id:req.params.id});
});

app.post("/:year/:exam/:id/:type",function(req, res) {
    combinedata.findById(req.params.id,function(err, combine) {
            
     if(err)
            {
             console.log(err);
            }   
     else
         { 
    var data={ 
        year:req.params.year,
        exam:req.params.exam,
        subject:combine.subject,
        pay_reg : req.body.Rem,
        voucher : req.body.Voucher,
        cheque  : req.body.cheque,
        cbf     : req.body.cbf,
        Name    : req.body.Exname,
        alongwith:req.body.alongwith,
        telephone:req.body.tele,
        address : req.body.addr,
        hours:req.body.hour,
        type : req.params.type,
        department_id:req.user._id
    };
    staffdata.create(data,function(err,staffdata)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            combinedata.findById(req.params.id,function(err, combine) {
            
             if(err)
                    {
                     console.log(err);
                    }   
             else
                 {
                     combine.staffdata.push(staffdata);
                     combine.save();
                    res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+req.params.id+"/"+req.params.type+"/"+staffdata._id);
                 }
             }); 
        }
    });}});
});


app.get("/:year/:exam/:combineid/:type/:id",middleware.staffdata,function(req, res) {
    
      combinedata.findById(req.params.combineid).populate("teacherdata").exec(function(err, combine) {
      if(err)
            {
              console.log(err);
          
             }
      else
         {
          
             staffdata.findById(req.params.id,function(err,staffdata){
                 if(err)
                       {   
                        console.log(err);
                       }
              
                  else
                       {   
                           res.render("staff/staffdata",{combine:combine, year:req.params.year,exam:req.params.exam,staffdata:staffdata,combineid:req.params.combineid,id:req.params.id });
                       }
            
                 
                 });
             }
       });
});

app.get("/:year/:exam/:combineid/:type/:id/edit",function(req, res) {
    
            staffdata.findById(req.params.id,function(err,staffdata){
                 if(err)
                       {   
                        console.log(err);
                       }
              
                 else
                       {    
                           res.render("staff/editstaff",{year:req.params.year,exam:req.params.exam,staffdata:staffdata,combineid:req.params.combineid,id:req.params.id });
                       }
            
             });
});

app.put("/:year/:exam/:combineid/:type/:id",function(req, res) {
    
    staffdata.findByIdAndUpdate(req.params.id,req.body.staffdata,function(err,updatedteacher)
         {
                 if(err)
                       {   
                        console.log(err);
                       }
                else
                     { 
                       res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+req.params.combineid+"/"+req.params.type+"/"+req.params.id);
                       
                    }
        
    });
});

app.delete("/:year/:exam/:combineid/:type/:id",function(req, res) {
    
    staffdata.findByIdAndRemove(req.params.id,function(err){
        if(err)
               {   
                console.log(err);
               }
         else
               {    
                   res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+req.params.combineid);
               }
    });
});

module.exports=app;