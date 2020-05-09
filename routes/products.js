const express=require('express');
const router=express.Router();
const productController=require('../controllers/product-controller');

router.get('/',productController.getAllProducts);

router.post('/addproduct',productController.addProduct);

router.get('/:id',productController.getProduct);

router.patch('/updateproduct/:id',productController.updateProduct);

router.delete('/deleteproduct/:id',productController.deleteProduct);

module.exports=router;