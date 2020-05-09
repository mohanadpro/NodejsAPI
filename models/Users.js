const mongoose=require('mongoose');

var Userschema=mongoose.Schema({
      username:{
            type:String,
            required:true,
      },
      password:{
            type:String,
            required:true
      }
})

module.exports=mongoose.model('User',Userschema);