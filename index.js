const express= require("express")
const app=  express();
require("./db/connection")
 const {company,candidate}= require("./model/schema")
 //const bcrypt= require("bcryptjs")
 const bcrypt= require("bcrypt")



const port= process.env.PORT ||3000;
// express.json() method is to reconize incoming request oject as a json oject
app.use(express.json());


//Create data  for Company
//.................................................
app.post("/company", (req,res)=>{
    
  const user1=new company(req.body)
   user1.save().then(()=>{
     console.log(user1)
   }).catch((error)=> console.log(error))
  console.log(user1)

res.send(user1)
})




app.get("/company",async(req,res)=>{
try {
    const companydata= await company.find();
    res.send(companydata)
    console.log(companydata)
    } catch (error) {
    console.log(error)}

})

// get  data from sigular method....... (fetch data from the database  by id)
app.get("/company/:id", async(req,res)=>{
try {
    const _id= req.params.id;
    const data= await company.findById({_id})
      console.log(data)
      res.send(data)
    
} catch (error) {
    console.log(error)
}
})



//Create data  for Candidate
//...................................................
app.post("/candidate", (req,res)=>{
    
     const user2=new candidate(req.body)
      user2.save().then(()=>{
        console.log(user2)
      }).catch((error)=> console.log(error))

})


// for Candidate data
//.....................................................
app.get("/candidate", async(req,res)=>{
  try {
    const candidatedata= await candidate.find();
    res.send(JSON.stringify(candidatedata, null, 2)).load(true);
    
  }catch (error) {
    console.log(error)
  }
})


// const securepas=async(password)=>{
// const passwordhash= await bcrypt.hash(password,10)
// const comparepas=await bcrypt.compare(password, passwordhash)
//  console.log(passwordhash)
//  console.log(comparepas)

// }

// securepas("anwar12")



app.listen(port,()=>{
    console.log("listening to the port number 3000")
})

