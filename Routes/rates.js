var express=require("express");
var app=express.Router({mergeParams:true});
var teacherRate=require("../models/teacherRate");
var staffRate=require("../models/staffRate");
var norms=require("../models/norms");

app.get("/rates",function(req,res){
    
    res.render("rates/showrates");
});

app.get("/rates/shownorms",function(req,res){
    
    norms.find({},function(err,norm){
       if(err){
           console.log(err);
       } 
       else{
           console.log(norm);
           res.render("rates/shownorm",{norm:norm});
       }
    });
    
});

app.get("/rates/showteacherrates",function(req,res){
    teacherRate.find({},function(err,teacher){
       if(err){
           console.log(err);
       } 
       else{
           console.log(teacher);
           res.render("rates/showteacherrate",{teacher:teacher});
       }
    });
});

app.get("/rates/showstaffrates",function(req,res){
    staffRate.find({},function(err,staff){
       if(err){
           console.log(err);
       } 
       else{
           console.log(staff);
           res.render("rates/showstaffrate",{staff:staff});
       }
    });

});

app.get("/rates/shownorms/:id/edit",function(req,res){
    
    norms.findById(req.params.id,function(err,norm){
       if(err){
           console.log(err);
       } 
       else{
           console.log(norm);
           res.render("rates/editnorm",{norm:norm});
       }
    });
    
});

app.get("/rates/showteacherrates/:id/edit",function(req,res){
    teacherRate.findById(req.params.id,function(err,teacher){
       if(err){
           console.log(err);
       } 
       else{
           console.log(teacher);
           res.render("rates/editteacherrate",{teacher:teacher});
       }
    });
});

app.get("/rates/showstaffrates/:id/edit",function(req,res){
    staffRate.findById(req.params.id,function(err,staff){
       if(err){
           console.log(err);
       } 
       else{
           console.log(staff);
           res.render("rates/editstaffrate",{staff:staff});
       }
    });

});

app.put("/rates/shownorms/:id",function(req, res) {
    
    norms.findByIdAndUpdate(req.params.id,req.body.norm,function(err,updateddata)
    
        {
                 if(err)
                    {   
                       console.log(err);
                     }
                 else
                     { 
                       console.log(updateddata);
                       res.redirect("/rates/shownorms");
                     }
        });
});

app.put("/rates/showteacherrates/:id",function(req, res) {
    
    teacherRate.findByIdAndUpdate(req.params.id,req.body.teacher,function(err,updateddata)
    
        {
                 if(err)
                    {   
                       console.log(err);
                     }
                 else
                     { 
                       console.log(updateddata);
                       res.redirect("/rates/showteacherrates");
                     }
        });
});

app.put("/rates/showstaffrates/:id",function(req, res) {
    
    staffRate.findByIdAndUpdate(req.params.id,req.body.staff,function(err,updateddata)
    
        {
                 if(err)
                    {   
                       console.log(err);
                     }
                 else
                     { 
                       console.log(updateddata);
                       res.redirect("/rates/showstaffrates");
                     }
        });
});

module.exports=app;