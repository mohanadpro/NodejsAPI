const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      category:{
            type:String,
            required:true
      },
      validityDate:{
            type:Date,
            required:true
      },
      price:{
            type:Number,
            required:true
      }
})


module.exports=mongoose.model('Product',productSchema);