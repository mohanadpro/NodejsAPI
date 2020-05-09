const Product=require('../models/Products')
var getAllProducts=function(req,res,next){
      Product.find()
      .select('_id name category validityDate price')
      .then(result=>{
            if(result.length==0)
            {
                  res.status(404).json({message:'Ther is no product'});
            }
            else
            {
                  const products={
                        result : result.map(result=>{
                            return { 
                              _id:result._id,
                              name:result.name,
                              category:result.category,
                              validityDate:result.validityDate,
                              price:result.price,
                              url:{
                                    type:'GET',
                                    urls:'localhost:3000:/products/'+result._id
                              }
                            }
                        })
                  }
                  res.status(200).json({message:products});
            }
      })
      .catch(err=>{
            res.status(404).json({message:err});
      })
}

var addProduct=function(req,res,next){
      var product=new Product({
            name:req.body.name,
            category:req.body.category,
            validityDate:req.body.validityDate,
            price:req.body.price
      })

      product.save()
      .then(product=>{
            res.status(201).json({message:'product '+product.name+' has been created successfully...'})
      })
      .catch(err=>{
            res.status(404).json({message:err})
      })
}

var getProduct=function(req,res,next){
      Product.findById(req.params.id)
      .then(product=>{
            res.status(200).json({message:product})
      })
      .catch(err=>{
            res.status(404).json({message:err});
      })
}

var updateProduct=function(req,res,next){
      updatedProduct={
            price:req.body.price
      }
      Product.findOneAndUpdate({_id:req.params.id},{$set:updatedProduct})
      .then(result=>{
            if(result)
            {
                  res.status(200).json({message:'product has been updated successfully'})
            }
            else
            {
                  res.status(404).json({message:'product is not found'});                  
            }
      })
      .catch(err=>{
            res.status(404).json({message:err});
      })
}

var deleteProduct=function(req,res,next){
      Product.findByIdAndDelete(req.params.id)
      .then(result=>{
            if(result)
            {
                  res.status(200).json({message:'product has been deleted successfully...'})
            }
            else
            {
                  res.status(404).json({message:'product is not found'});                  
            }
      })
      .catch(err=>{
            res.status(404).json({message:err})
      })
}

module.exports={
      getAllProducts:getAllProducts,
      addProduct:addProduct,
      getProduct:getProduct,
      updateProduct:updateProduct,
      deleteProduct:deleteProduct
}