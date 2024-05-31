import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3000


app.get("/",(req, res) => {
    res.send("hello from hitesh and his tea");
})

app.get("/ice-tea",(req, res) => {
    res.send("what ice tea would you preffered?");
})

app.get("/twitter",(req, res) => {
    res.send("abhinav gupta twitter");
})


app.use(express.json())

let teaData = []
let nextId =1

// add new tea data
app.post('/teas',(req, res) => {
   const {name , price} = req.body
   const newTea = {id:nextId++,name,price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})
// get all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// get a tea by id
app.get('/teas/:id',(req,res)=>{
   const tea = teaData.find(t =>t.id===parseInt(req.params.id))
   if(!tea){
    return res.status(404).send("tea not found")
   }
   res.status(200).send(tea)
})


// update tea
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t =>t.id===parseInt(req.params.id))
    
    if(!tea){
        return res.status(404).send("tea not found")
       }
       // what thing you want to update
       const {name,price} = req.body
       tea.name = name
       tea.price = price
       res.send(200).send(tea)
})


// delete tea

app.delete('/teas/:id',(req,res)=>{
   const index = teaData.findIndex(t=>t.id===parseInt(req.params.id))
   if(index=== -1){
    return res.status(404).send("tea not found")
   }
   teaData.splice(index,1)
   return res.status(204).send('deleted')
})


// start server
app.listen(port,()=>{
    console.log(`Server is listening at ${port}...`)
})