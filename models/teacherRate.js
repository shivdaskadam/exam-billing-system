var mongoose= require("mongoose");

var rateSchema= new mongoose.Schema({
   year: String,
  practicalOther: Number,
  practicalWorkshop: Number,
  practicalSurvey: Number,
  termwork: Number,
  oral: Number,
  prTermWork: Number,
  prOral : Number,
  prSeminar: Number,
});

module.exports= mongoose.model("TeacherRate",rateSchema);