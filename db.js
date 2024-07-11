
const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://m001-student:12345@cluster0.3ofpc.mongodb.net/AMcars' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successful')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose