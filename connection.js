const mongoose= require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/company").then(()=>{
    console.log("connection successfull")
}).catch((error)=>
    console.log(error)
)
