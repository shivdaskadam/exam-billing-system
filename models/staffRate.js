var mongoose= require("mongoose");

var staffRateSchema= new mongoose.Schema({
    expert: Number,
    lab : Number,
    techAsst : Number,
    peons : Number,
    hours : Number
    });

module.exports= mongoose.model("StaffRate",staffRateSchema);