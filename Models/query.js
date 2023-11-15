const mongoose = require("mongoose")
const validator = require('validator')
const FormDataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not a email")
            }
        }
    },
    message:{
        type:String,
        required:true
    }
})
const FormData = new mongoose.model('FormData' ,FormDataSchema );

module.exports = FormData;