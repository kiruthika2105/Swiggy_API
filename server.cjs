const bodyParser = require('body-parser')
const  cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const {Restaurants,Users}=require('./schema.cjs')


const app=express()
 // app.listen(8000,function(){
 //     console.log(`listening on port 8000....`)
 // })
app.use(bodyParser.json())
app.use(cors())
async function connectToDb(){
    try{
        const port =process.env.PORT || 8000
        await mongoose.connect('mongodb+srv://kiruthika210504:7806914325Kiruthika@cluster0.rkkhif0.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('connection established :')
        app.listen(port,function(){
            console.log(`listening on  port ${port}....`)
        })
    }catch(error){
        console.log(error)
        console.log("counld't established")
    }
}connectToDb()

app.post('/add-restaurant', async function(request, response){
    try{
        await Restaurants.create({
        "areaName":request.body.areaName,
        "avgRating":request.body.avgRating,
        "costForTwo":request.body.costForTwo,
        "cuisines":request.body.cuisines,
        "name":request.body.name
    })
        response.status(201).json({
            "status":"added entry"
        })
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"internal  server error"
        })
    }
})


app.get('/get-restaurant-details', async function(request, response) {
    try {
        const restaurantDetails = await Restaurants.find()
        response.status(200).json(restaurantDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch",
            "error" : error
        })
    }
})

app.post('/create-new-user',async function (request, response) {
    try{
        await Users.create({
            " userName": request.body.username,
            "email": request.body.email,
            "password": request.body.password
        })
        response.status(201).json({
            "status": "successfully added entry"
        })
    }
    catch(error){
        response.status(500).json({
            "Status":"failure",
            "message":"internal server error"
        })
    }
})


app.post('/validate-user',async function(request,response){
    try{
        const users = await Users.findOne({
            "email": request.body.email,
            "password":request.body.password
        })
        if(users){
            response.status(200).json({
                "message":"valid user"
            })

        }
        else {
            response.status(401).json({
                "message" : "invalid user"
            })
        }
    }catch(error){
        response.status(500).json({
            "message" : "internal server error"

        })

    }
})