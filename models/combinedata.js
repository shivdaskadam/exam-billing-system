var mongoose= require("mongoose");

var combineSchema= new mongoose.Schema({
   year:String,
   exam:String,
   date_prep1: Date,
   date_prep2:Date,
   date_exam1:Date,
   date_exam2:Date,
   date_exam3:Date,
   date_clean:Date,
   students : Number,
   subject : String,
   examdays:Number,
   college:String,
   cal_year:String,
   semester:String,
   dept:String,
   teacherdata:[
         { type:mongoose.Schema.Types.ObjectId,
            ref: "teacherdata"}
       ],
       
   staffdata:[
       {type:mongoose.Schema.Types.ObjectId,
            ref: "staffdata"}
            ],
   department: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});


  module.exports= mongoose.model("combinedata",combineSchema);