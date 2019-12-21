var mongoose= require("mongoose");

var normsSchema= new mongoose.Schema({
    year:String,
    exam: String,
    preparation : Number,
    cleaning : Number,
    expert : Number,
    labAsst : Number,
    techAsst : Number,
    peon : Number,
    batch : Number
    });

module.exports= mongoose.model("norms",normsSchema);