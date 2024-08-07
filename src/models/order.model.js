const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    billingDetails:{
        firstName:String,
        lastName:String,
        companyName:String,
        address:{
            houseNo:Number,
            town:String,
            country:String,
            zipCode:Number,
        },
        mobileNumber:String,
        email:String,
        orderNote:String
    },

    cartItems:[{
        productName:String,
        price:Number,
        quantity:Number,
    }],

    totalBill:Number

});

module.exports = mongoose.model('orders',orderSchema);