var teacherRate=require("../models/teacherRate");
var teacherdata= require("../models/teacherdata");
var staffdata =require("../models/staffdata");
var staffRate=require("../models/staffRate");
var combinedata=require("../models/combinedata");
var norms=require("../models/norms");
var calc={};

calc.teacheramt= function(student,examrate,exam)
{ 
   var rate=examrate/2;
   if(exam =="termwork"){ rate=examrate; }
   var amt;
   amt= student * rate;
   return amt;
};



calc.staffamt=function(batch,prep,clean,rateexam,rateother)
{
  var prepamt= rateother * prep;
  var examamt= rateexam * batch;
  var cleanamt= rateother * clean;
  var totalamt = prepamt + examamt +cleanamt ;
  var staff={
      prep : prepamt,
      exam : examamt,
      clean:cleanamt,
      total: totalamt,
      batch: batch,
      rate:rateexam
  };
  return staff;
};

calc.calcbatch=function(st,b){
     var batch;
     if(st%b >= b/2)
     {
	batch=Math.ceil(st/b);

     }
     else
	{
	 batch=Math.floor(st/b);
	}
	return batch;
};
var middlewareObj={};

middlewareObj.teacherdata=function(req,res,next){
     var rate;
    var amount;

    var  year= (req.params.year).toString();
    teacherRate.findOne({"year":year},function(err,teacherrate){
        if(err)
        {
            
            console.log(err);
        }
        else
        {
            
             combinedata.findById(req.params.combineid,function(err, combine) {
             if(err){
                 console.log(err);
             }   
             else
             {
                    console.log(combine);
                    
                    teacherdata.findById(req.params.id,function(err,teacher)
                    {
                         if(err)
                        {   
                         console.log(err);
                        }
                        else
                        {  
                              amount=calc.teacheramt(combine.students,teacherrate[combine.exam],combine.exam);
                              rate =teacherrate[combine.exam];
                                   
                                teacherdata.updateOne({_id:req.params.id},{$set:{total: amount,rate:rate}},function(err,updated)
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        console.log(updated);
                                        next();
                                        
                                    }
                                    
                               });
                        }
                    });
             }
        });
            
      }
  });
};
            
middlewareObj.staffdata=function(req,res,next)
{
   var  year= (req.params.year).toString();
    teacherRate.findOne({"year":year},function(err,teacherrate){
        if(err)
        {
            
            console.log(err);
        }
        else
        {   
         norms.findOne({"year":year,"exam":req.params.exam},function(err,norms){
             if(err)
            {
                
                console.log(err);
            }
            else
            {
             
            var c,b;
            console.log(teacherrate);
             staffdata.findById(req.params.id,function(err,staff){
                 if(err)
                 {   
                     console.log(err);
                }
                 else
                     {    
                        console.log(staff);
               
                        staffRate.find({},function(err,staffRate1){
                             if(err)
                             {   
                                 console.log(err);
               
                             }
                            else
                                 {  
                                     
                                   if(staff.hours>4 && staff.hours<=7){
                                   c=1,b=1;
                                 }
                                     else if(staff.hours<=4 && staff.hours>0){
                                              c=0,b=1;
                                             }
                                             
                                     combinedata.findById(req.params.combineid,function(err, combine) {
                                     if(err){
                                         console.log(err);
                                        }   
                                     else
                                       {
                                        console.log(combine);
                                        console.log(staffRate1[c]);
                        
                                        var batch = calc.calcbatch(combine.students,norms.batch);
                        
                                        var amt;

                        
                                        amt= calc.staffamt(batch,norms.preparation,norms.cleaning,staffRate1[c][staff.type],staffRate1[b][staff.type]);
                                           
                                             staffdata.updateOne({_id:req.params.id},{$set:{total: amt.total,rate:amt.rate,prepcost:amt.prep,cleancost:amt.clean,examcost:amt.exam,batches:amt.batch}},function(err,updated){
                                                 if(err)
                                                {
                                                    console.log(err);
                                                 }
                                                      else
                                                         {
                                                           console.log(updated);
                                                             next();
                                                
                                                 }
                                             });
                                         } 
                                    }); 
                                 }  
                           });
                       }
                }); 
           }});}
     });
};


  middlewareObj.isLoggedIn= function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/");
  };
module.exports= middlewareObj;