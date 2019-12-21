var mongoose= require("mongoose");

var rateSchema= new mongoose.Schema({
   year:String,
   exam:String,
   subject:String,
   pay_reg : String,
   voucher : String,
   cheque  : String,
   cbf      : String,
   Name : String,
   address : String,
   prepcost:Number,
   examcost:Number,
   cleancost:Number,
   total : Number,
   rate : Number,
   type :String,
   hours : Number,
   batches:Number,
   department_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
   }
});

    module.exports= mongoose.model("staffdata",rateSchema);