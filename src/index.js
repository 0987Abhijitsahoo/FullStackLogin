var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/LoginForms')
var db=mongoose.connection
db.on('error',()=> 
    console.log("Error in Connecting to Database"))
db.once('open',()=> 
    console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    console.log("recieved request",req.body)
    var name= req.body.name

    var password=req.body.password

    var data={
        "name":name,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signupsuccess.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")