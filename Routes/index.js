var express=require("express");
var app=express.Router({mergeParams:true});
var combinedata = require("../models/combinedata");
var teacherRate=require("../models/teacherRate");
var teacherdata=require("../models/teacherdata");
var staffdata=require("../models/staffdata");
var middleware =require("../middleware/logic");
var norms=require("../models/norms");


app.get("/landing",middleware.isLoggedIn,function(req,res){
    
    res.render("landing");
});

app.get("/:year",middleware.isLoggedIn,function(req,res){
    combinedata.find({"year":req.params.year,"department.id":req.user._id}).populate("teacherdata").populate("staffdata").exec(function(err,combine){
                 if(err)
                   {
                       
                        console.log(err);
                    }
                  else
                    {    
                         
                         res.render("yeardata",{combine:combine,year:req.params.year,exam:req.params.exam});
                     }
         });
});

app.get("/:year/:exam",middleware.isLoggedIn,function(req,res){
    
     norms.findOne({"year":req.params.year,"exam":req.params.exam},function(err,norm){
                 if(err)
                {
                    
                    console.log(err);
                }
                else
                {
                         res.render("main/mainform",{norm:norm,year:req.params.year,exam:req.params.exam});
                } 
                });
});


app.post("/:year/:exam",function(req, res) {
    var data={
   year:req.params.year,
   exam:req.params.exam,
   date_prep: req.body.prep,
   date_prep1:req.body.prep1,
   date_exam:req.body.examdate,
   date_clean:req.body.cleandate,
   students : req.body.stud,
   subject : req.body.sub,
   examdays:req.body.examdays,
   college:req.body.college,
   department:{
        id: req.user._id,
        username: req.user.username
    }
    };
    
    combinedata.create(data,function(err, combinedata) {
        if(err){
            console.log(err);
            res.redirect("/"+req.params.year+"/"+req.params.exam);
        }
        else
        {
            console.log(combinedata);
            res.redirect("/"+req.params.year+"/"+req.params.exam+"/"+combinedata._id);
        }
        
    });
    
});

app.get("/:year/:exam/:combineid",middleware.isLoggedIn,function(req,res){
  var  year= (req.params.year).toString();
  var internalc,externalc,labc,techc,expertc,peonc;
   
    teacherRate.findOne({"year":year},function(err,teacher){
        if(err)
          {
            
            console.log(err);
          }
        else
           {
               norms.findOne({"year":year,"exam":req.params.exam},function(err,norm){
                 if(err)
                {
                    
                    console.log(err);
                }
                else
                {
             
               combinedata.findOne({"_id":req.params.combineid,"department.id":req.user._id}).populate("teacherdata").populate("staffdata").exec(function(err,combine){
                 if(err)
                   {
                
                        console.log(err);
                    }
                  else
                    {    var subject=(combine.subject).toString(); 
                         teacherdata.countDocuments({year:combine.year,exam:combine.exam,type:"internal",subject:combine.subject,department_id:req.user._id},function(err,count){
                             if(err) {  console.log(err); }
                                else{
                                              internalc=parseInt(count,10);console.log(internalc); 
                                              
                                        teacherdata.countDocuments({year:combine.year,exam:combine.exam,type:"external",subject:combine.subject,department_id:req.user._id},function(err,count){
                                          if(err) {  console.log(err); }
                                            else{
                                                 externalc=parseInt(count,10);console.log(externalc); 
                                                 staffdata.countDocuments({year:combine.year,exam:combine.exam,type:"lab",subject:combine.subject,department_id:req.user._id},function(err,count){
                                                    if(err) {  console.log(err); }
                                                    else{
                                                         labc=parseInt(count,10);console.log(labc);  
                                                            
                                                        staffdata.countDocuments({year:combine.year,exam:combine.exam,type:"expert",subject:combine.subject,department_id:req.user._id},function(err,count){
                                                                if(err) {  console.log(err); }
                                                                else{
                                                                     expertc=parseInt(count,10);console.log(expertc);
                                                                     staffdata.countDocuments({year:combine.year,exam:combine.exam,type:"techAsst",subject:combine.subject,department_id:req.user._id},function(err,count){
                                                                            if(err) {  console.log(err); }
                                                                            else{
                                                                                 techc=parseInt(count,10);console.log(techc);
                                                                                 staffdata.countDocuments({year:combine.year,exam:combine.exam,type:"peons",subject:combine.subject,department_id:req.user._id},function(err,count){
                                                                                        if(err) {  console.log(err); }
                                                                                        else{
                                                                                             peonc=parseInt(count,10);console.log(peonc);   
                         res.render("route",{norm:norm,internalc:internalc,externalc:externalc,labc:labc,expertc:expertc,techc:techc,peonc:peonc,combine:combine,teacher:teacher,year:req.params.year,exam:req.params.exam,id:req.params.combineid});
                     }
                });
               
           }
        });}});}});}});}});}});}});}});
 });

app.get("/:year/:exam/:combineid/edit",middleware.isLoggedIn,function(req, res) {
     norms.findOne({"year":req.params.year,"exam":req.params.exam},function(err,norm){
       if(err)
           {
                  console.log(err);
                }
                else
                {
        combinedata.findById(req.params.combineid,function(err,combine)
        {
                 if(err)
                     {   
                      console.log(err);
                     }
              
                else
                     {   
                          res.render("main/editmain",{norm:norm,year:req.params.year,exam:req.params.exam,combine:combine,combineid:req.params.combineid });
                     }
            
     });}});
});


app.put("/:year/:exam/:combineid",function(req, res) {
    
    combinedata.findByIdAndUpdate(req.params.combineid,req.body.combine,function(err,updateddata)
    
        {
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

app.delete("/:year/:exam/:combineid",function(req, res) {
    
    combinedata.findByIdAndRemove(req.params.combineid,function(err){
                 if(err)
               {   
                console.log(err);
               }
               else
               {   
                   console.log("deleted");
                   res.redirect("/"+req.params.year);
               }
    });
});
module.exports=app;    