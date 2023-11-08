const mongoose= require("mongoose")
const validator= require("validator")
//const bcrypt= require("bcryptjs")
const bcrypt= require("bcrypt")









const companyschema=new mongoose.Schema({
    Date:{
        type:Date,
        default:Date.now },

 CompanyName:{
              type:String, 
              required: true },

    Country:{type:String,
                    required:true},

     PostalAdddress:Number,
     
    TelephoneNumber:Number,

     Cell_NO:{
         type:Number
     },

     Website: {
         type:String},
     
    Email: {
             type:String,
              required:true,
             // unique:[true," Email is already exists"],
          validate:{ 
            validator:validator.isEmail,
            message: "{value} is not valid email" }
        },


        CareOf_Name:String,
         
        CareOf_cell:{
            type:Number
        },
        
        CareOf_Address:String,

        CreateDate_or_RenameDateToCreatedDate:{
            type:Date,
       default:Date.now
        },

        CreatedAt:{
            type:Date,
            default: Date.now
        },
        UpdateAt:{
            type:Date,
            default: Date.now
        },
        DeleteAt:{
            type:Date,
            default: Date.now
        },

        CompanyUnique_id:{type:Number,
                          unique:true},
        Status:String,
        password:{type:String
                  }
     })

    // companyschema.pre("save", async function(next){
      
    //     console.log(`the curent password is ${this.password}`)
    //     const passwordhash= await bcrypt.hash(this.password, 10);
    //     console.log(passwordhash);
    //     next();
    // })
 


     
 // Candiate Schema
 const Condidateschema= new mongoose.Schema({
    Date:{
     type:Date,
     default:Date.now },
     EmigrantsRegistrationNo:Number,
     Name:String,
     FatherName:String,
     CNIC:Number,
     DateOFBirth:Date,
     PlaceOfBirth:String,
     Address:String,
     TelephoneNumber:Number,
     Mobile_CandidateNo:Number,
     Email:{type:String,
         required:true,
         //unique:true,
         validate:{
            validator:validator.isEmail,
            message:"{value} is not valid Email"
         }}
     })

            
     companyschema.pre("save", async function(next){
      

        const salt= await bcrypt.genSalt(10)
        const hashpas=await bcrypt.hash(this.password,salt)
        this.password=hashpas;
    
        
            const comparepas= await bcrypt.compare(this.password, hashpas)
       
    
     console.log(`the curent password is ${this.password}`)
     console.log(`the curent hash password is ${hashpas}`)
     console.log(`the  compare password is ${comparepas}`)
    
    
    
                 
         next();
    
     
     }) 



 // model for company data
 const company= new mongoose.model("company",companyschema)
// model for candidate data
const candidate= new mongoose.model("candidate", Condidateschema)








 module.exports={company, candidate}