const express = require('express');
const router = express.Router();
const {addProduct,deleteProduct,editProduct,getProducts} = require('../controllers/product.controllers');
const {isAuthenticated} = require('../middlewares/authenticationChecking.middleware');

router.post('/addProduct',isAuthenticated,addProduct);

router.post('/editProduct',isAuthenticated,editProduct);

router.post('/deleteProduct/:productID',isAuthenticated,deleteProduct);


router.get('/getAllProducts',getProducts);

router.get('/status',(req,res)=>{
    console.log(req.user);
    console.log(req.session.passport.user);
    const obj = req.session.passport;
    return res.json(req.session.passport);

});

module.exports = router;