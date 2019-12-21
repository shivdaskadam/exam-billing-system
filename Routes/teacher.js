var express=require("express");
var app=express.Router({mergeParams:true});
var combinedata = require("../models/combinedata");
var teacherdata= require("../models/teacherdata");
var middleware =require("../middleware/logic");


app.get("/:year/:exam/:id/teacher/:type",function(req, res) {
    
    res.render("teacher/form",{year:req.params.year,exam:req.params.exam,type:req.params.type,id:req.params.id});
});

app.post("/:year/:exam/:id/teacher/:type",function(req, res) {
   
   combinedata.findById(req.params.id,function(err, combine) {
     if(err){
         console.log(err);
     }   
     else
     { 
    var data={ 
        year: req.params.year,
        exam:req.params.exam,
        subject:combine.subject,
        rem_reg : req.body.Rem,
        voucher : req.body.Voucher,
        cheque  : req.body.cheque,
        Name    : req.body.Exname,
        alongwith:req.body.alongwith,
        telephone:req.body.tele,
        address : req.body.addr,
        type :req.params.type,
        department_id:req.user._id
        
    };
    teacherdata.create(data,function(err,teacherdata){
        if(err)
        {
            console.log(err);
        }
        else
        {
            combinedata.findById(req.params.id,function(err, combine) {
             if(err){
                 console.log(err);
             }   
             else
             {
                 console.log(combine);
                 combine.teacherdata.push(teacherdata);
                 combine.save();
               res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+req.params.id+"/teacher/"+req.params.type+"/"+teacherdata._id);
  
             }
            });
        }
    });
     }});
});
app.get("/:year/:exam/:combineid/teacher/:type/:id",middleware.teacherdata,function(req, res) {
 
  combinedata.findById(req.params.combineid).populate("teacherdata").exec(function(err, combine) {
      if(err){
          console.log(err);
          
      }
      else
      {
           console.log(combine);
            teacherdata.findById(req.params.id,function(err,teacherdata){
                 if(err)
               {   
                console.log(err);
               }
               else
               {    
                   res.render("teacher/teacherdata",{combine:combine, teacherdata:teacherdata,year:req.params.year,exam:req.params.exam,combineid:req.params.combineid,id:req.params.id});
               }
            });
    
      }
  });
});

app.get("/:year/:exam/:combineid/teacher/:type/:id/edit",middleware.teacherdata,function(req, res) {
    
            teacherdata.findById(req.params.id,function(err,teacherdata){
                 if(err)
                 {   
                  console.log(err);
                 }
                else
                {    
                   res.render("teacher/editteacher",{teacherdata:teacherdata,year:req.params.year,exam:req.params.exam,combineid:req.params.combineid,id:req.params.id});
                }
            });
});

app.put("/:year/:exam/:combineid/teacher/:type/:id",function(req, res) {
    
       teacherdata.findByIdAndUpdate(req.params.id,req.body.teacherdata,function(err,teacherdata){
                 if(err)
                       {   
                        console.log(err);
                       }
                else
                   {    
                       res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+req.params.combineid+"/teacher/"+req.params.type+"/"+req.params.id);
                   }
            });
});

app.delete("/:year/:exam/:combineid/teacher/:type/:id",function(req, res) {
    teacherdata.findByIdAndRemove(req.params.id,function(err,teacherdata){
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