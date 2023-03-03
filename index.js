// packages
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')


const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())



// file import
const taskSchema = require('./model/Task')

const Task = mongoose.model("Tasks", taskSchema)

const mongoDBAccess = 'mongodb+srv://shalommathew:wZkRb2jxQblFFx2J@cluster0.nzfk0l7.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);
mongoose.connect(mongoDBAccess, { useNewUrlParser: true }).then(() => {
    console.log('you app has been connected to mongoDB')
}).catch((err) => {
    console.log(err)
})


// creating new shop to the DB

// const Task2 = new Task( {
//     name:'new shop testing delete',
//     date: '26/01/2023',
//     isCompleted: false
// })

// Task2.save()

// Read shop from the DB

// Task.find((err,tasks)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(tasks)
// })

// Update a shop in the DB

// Task.findOneAndUpdate({name:'shop 2'}, {date:'30/01/2023'}, (err,shop)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(shop)
// })

// Delete a shop

// Task.findOneAndDelete({_id:'63d840303a464f33ec4a1670'},(err,shop)=>{
//     if (err) {
//         console.log(err)
//     }
//     else{
//         console.log(shop, 'shop deleted')
//     }
// })

// Get all shop

app.get('/shop', (req, res) => {
    Task.find((err, shop) => {
        if (err) {
            res.send(err)
        }
        res.send(shop)
    })
})

// Get shop by ID

app.get('/shop/:id',(req, res)=>{
Task.findById(req.params.id,(err, shop)=>{
    if(err){
        res.send(err)
    }
    res.send(shop)
})
})


// Post shop

app.post('/shop', (req, res) => {
    console.log(res)
    const newTask = new Task({
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity,
        price: req.body.price
    })

    newTask.save().then((shop) => res.send('shop created')).catch((err) => res.send(err))

})

// Update shop

app.patch("/shop/:id",(req,res)=>{
  Task.findOneAndUpdate({_id : req.params.id},{name:req.body.name},(err,shop)=>{
    if(err){
       res.send(err)
    }
    res.send(shop)
})

})

app.put("/shop/:id",(req,res)=>{
    Task.findByIdAndUpdate(req.params.id,{quantity:req.body.quantity,name:req.body.name,type:req.body.type,price:req.body.price},(err,shop)=>{
      if(err){
          res.send(err)
      }
      res.send(shop)
  })
  
})
  
// Delete shop

app.delete("/shop/:id", (req,res)=>{
    Task.findByIdAndDelete(req.params.id,(err,shop)=>{
        if (err){
            res.send(err)
        }
        res.send({message:"succes",data: shop})
    })

})


const port = 3000

app.listen(port, () => {
    console.log(` we are in port ${port}`)
})







