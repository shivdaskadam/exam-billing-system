var mongoose= require("mongoose");

    var rateSchema= new mongoose.Schema({
   year: String,
   exam:String,
   subject:String,
   rem_reg : String,
   voucher : String,
   cheque  : String,
   Name : String,
   address : String,
   alongwith : String,
   telephone : Number,
   total : Number,
   rate : Number,
   type: String,
   department_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
   }
});

    
    module.exports= mongoose.model("teacherdata",rateSchema);