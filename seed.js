var staffRate = require("./models/staffRate");
var teacherRate=require("./models/teacherRate");
var norms= require("./models/norms");

var normdata=[
        {   year:"SE",    
            exam: "oral",
            preparation : 1,
            cleaning : 0,
            expert : 0,
            labAsst : 1,
            techAsst : 0,
            peon : 1,
            batch : 20
         },
          { year:"SE",       
            exam: "practicalOther",
            preparation : 2,
            cleaning : 1,
            expert : 4,
            labAsst : 1,
            techAsst : 1,
            peon : 2,
            batch : 12
         },
         {  year:"SE", 
            exam: "practicalSurvey",
            preparation : 2,
            cleaning : 1,
            expert : 2,
            labAsst : 1,
            techAsst : 1,
            peon : 2,
            batch : 20 
         },
         {
             year:"SE", 
            exam: "practicalWorkshop",
            preparation : 2,
            cleaning : 1,
            expert : 1,
            labAsst : 1,
            techAsst :4,
            peon : 2,
            batch : 12
         },
         {
             year:"SE", 
            exam: "termwork",
            preparation : 0,
            cleaning : 0,
            expert : 0,
            labAsst : 0,
            techAsst :0,
            peon : 0,
            batch : 0
         },
         
        {   year:"TE",    
            exam: "oral",
            preparation : 1,
            cleaning : 0,
            expert : 0,
            labAsst : 1,
            techAsst : 0,
            peon : 1,
            batch : 20
         },
          { year:"TE",       
            exam: "practicalOther",
            preparation : 2,
            cleaning : 1,
            expert : 4,
            labAsst : 1,
            techAsst : 1,
            peon : 2,
            batch : 12
         },
         {  year:"TE", 
            exam: "practicalSurvey",
            preparation : 2,
            cleaning : 1,
            expert : 2,
            labAsst : 1,
            techAsst : 1,
            peon : 2,
            batch : 20 
         },
         {
             year:"TE", 
            exam: "practicalWorkshop",
            preparation : 2,
            cleaning : 1,
            expert : 1,
            labAsst : 1,
            techAsst :4,
            peon : 2,
            batch : 12
         },
         {
             year:"TE", 
            exam: "termwork",
            preparation : 0,
            cleaning : 0,
            expert : 0,
            labAsst : 0,
            techAsst :0,
            peon : 0,
            batch : 0
         }
          ,
        {   year:"BE",      
            exam: "oral",
            preparation : 1,
            cleaning : 0,
            expert : 0,
            labAsst : 1,
            techAsst : 0,
            peon : 1,
            batch : 20
         },
          { 
             year:"BE", 
            exam: "practicalOther",
            preparation : 2,
            cleaning : 1,
            expert : 4,
            labAsst : 1,
            techAsst : 1,
            peon : 2,
            batch : 12
         },
  
         { year:"BE",
         exam: "practicalWorkshop",
            preparation : 2,
            cleaning : 1,
            expert : 1,
            labAsst : 1,
            techAsst :4,
            peon : 2,
            batch : 12
         },
         {year:"BE",
         exam: "prTermWork",
            preparation :1,
            cleaning : 0,
            expert : 0,
            labAsst : 1,
            techAsst :0,
            peon : 1,
            batch : 20
            },
             {year:"BE",
         exam: "prOral",
            preparation :1,
            cleaning : 1,
            expert : 0,
            labAsst : 1,
            techAsst :1,
            peon : 1,
            batch : 12
            },
             {year:"BE",
         exam: "prSeminar",
            preparation :0,
            cleaning : 0,
            expert : 0,
            labAsst : 1,
            techAsst :1,
            peon : 1,
            batch : 12
            }
          
          ];
          
var dataTeacher=[
            { 
                year : "FE",
                practicalOther : 20,
                practicalSurvey : 20,
                practicalWorkshop : 20,
                termwork : 12,
                oral : 12,
                prTermWork : 0,
                prSeminar:0,
                prOral:0
            }
            ,
             {
                 year : "SE",
                 practicalOther : 20,
                 practicalSurvey : 20,
                 practicalWorkshop : 20,
                 termwork : 12,
                 oral : 12,
                 prTermWork : 0,
                 prSeminar:0,
                 prOral:0
             },
            
            {
                year : "TE",
                practicalOther : 23,
                practicalSurvey : 23,
                practicalWorkshop : 23,
                termwork : 19,
                oral : 19,
                prTermWork : 0,
                prSeminar:0,
                prOral:0
            },
            
            { 
                year : "BE",
                practicalOther : 23,
                practicalWorkshop : 23,
                practicalSurvey : 0,
                oral : 19,
                termwork:19,
                prTermWork : 120,
                prSeminar:120,
                prOral:129
            },
    ];
   
  var dataStaff=[
      {
         expert: 85,
        lab : 40,
        techAsst : 40,
        peons : 25,
        hours : 4
      },
      
      {
         expert: 85,
        lab : 45,
        techAsst : 45,
        peons : 40,
        hours : 7
      }
      
      ];
      
    
    
    function seedDB(){
    staffRate.deleteMany({},function(err){
        
        if(err){
            console.log(err);
        }
           console.log("deleted");
            dataStaff.forEach(function(seed){
            staffRate.create(seed,function(err,staff){
                  if(err){
                      console.log(err);
                       } 
                   else{
                       console.log(staff);
                     }
            });
       
         }); 
    });
    
    teacherRate.deleteMany({},function(err){
        
        if(err){
            console.log(err);
        }
           console.log("deleted");
             dataTeacher.forEach(function(seed){
            teacherRate.create(seed,function(err,teacher){
                if(err){
             console.log(err);
             } 
            
     else{
         console.log(teacher);
         }
                
        });
     });
});
      
      norms.deleteMany({},function(err){
        
                            if(err){
                                console.log(err);
                              }
                               console.log("deleted");
                                 normdata.forEach(function(norm){
                                            norms.create( norm,function(err,norm){
                                    if(err){
                                         console.log(err);
                                         } 
                                
                                     else{ 
                                           console.log(norm);
                                          
                                        
                                     }
                              });
                    });
             });   
}     
  
    
module.exports=seedDB;
    