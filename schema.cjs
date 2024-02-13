const mongoose=require('mongoose')
 const restaurantsSchema = new mongoose.Schema({
     areaName:{
         type: String
     },
     avgRating:{
         type: Number,
         // requires:true
     },
     costForTwo:{
         type: Number,
         // requires:true
     },
     cuisines:{
         type: Array
         // requires:true
     },
     name:{
         type: String,
         // requires:true
     },
     // restaurantType:{
     //     type: String,
     //     requires:true
     // },


 },{versionKey:false})
const Restaurants = mongoose.model('userDetails',restaurantsSchema)





//schema --- constructor
//schema defining

const userSchema = new mongoose.Schema({
    contact:{
        type: String
    },
    userName: {
        type: String,

    },
    email:{
        type:String,
        // required:true,
        // unique:true


    },
    password:{
        type:String,
        // required:true

    }


},{versionKey:false})
const Users = mongoose.model('userDetails1',userSchema)



module.exports={Restaurants,Users}