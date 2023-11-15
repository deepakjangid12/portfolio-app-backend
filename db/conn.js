const mongoose =require("mongoose")
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const mongoConnect = async()=>{
    try{
       await mongoose.connect(uri);
       console.log("db connected");
    }
    catch(e){
        console.log(e);
        console.log("db conn is not sucessful")
    }
}
// const mongoose =require('mongoose')
// mongoose.connect('mongodb://127.0.0.1/portfolio', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
module.exports = mongoConnect;
