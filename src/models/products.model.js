const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName:String,
    description:String,
    price:Number,
    quantity:Number

},{timestamps:true});


const productModel = mongoose.model('products',productSchema);

module.exports = productModel