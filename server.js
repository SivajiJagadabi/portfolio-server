const express=require('express')
const app=express()
const cors=require('cors')
const nodemailer = require("nodemailer");
const mySql=require('mysql')


app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000","https://sivajiportfolio.netlify.app","https://jagadabisivaji.netlify.app","https://jagadabiportfolio.netlify.app"],
}));



const db=mySql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    database:"feedback"
})

app.get('/contact',(req,res)=>{
    res.send('Hello World!')
})

app.post('/contact',(req,res)=>{
    console.log(req.body.email)
    const name=req.body.name
    const email=req.body.email 
    const phone=req.body.phone 
    const message=req.body.message 

    const sql="INSERT INTO contact (`name`,`email`,`phone`,`message`) VALUES(?)"
    const values=[req.body.name,req.body.email,req.body.phone,req.body.message ]

    db.query(sql,[values],(err,data)=>{
        console.log(values)
        if (err) {
            var error = 'Failed to execute statement due to the following error: ' + err.message;
            console.error(error);
            return res.send(error);
        }
        return res.json(data);

    })
    

  const transporter=nodemailer.createTransport({
    service:'gmail',
   
    auth:{
        user:'jagadabisivaji@gmail.com',
        pass:'qzkv gjju zicx tnbn'
    }
  })
  const mailOptions={
    from:req.body.email,
    to:'jagadabisivaji@gmail.com',
    subject:`Message From ${req.body.email}:${req.body.name}:${req.body.phone}`,
    text:req.body.message
  }

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error)
        res.send('error')
    }else{
        res.send('Email Sent'+info.response)
        console.log('success')
    }
  })


})


app.listen(3001,()=>{
    console.log('Server Running at 3001')
})