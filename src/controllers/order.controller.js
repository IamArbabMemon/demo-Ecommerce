const orderModel = require('../models/order.model');

const addOrder = async(req,res)=>{
    try{

      if(!req.body)  
        return res.status(400).json({success:false,error:'request body is empty !'});
      
      let cartItems= [];
      
      const {billingDetails} = req.body;
      console.log(billingDetails);
      cartItems = req.body.cartItems; 

      const totalBill = cartItems.reduce((total,item)=> total+(item.price*item.quantity),0);  

      await orderModel.create({
        billingDetails,
        cartItems,
        totalBill
      });

      //req.session.cart = cartItems;

      return res.status(200).json({success:true,message:'Order has been placed'});

    }catch(err){
        return res.status(500).json({success:false,error:err.message});
    }
};


module.exports = {
    addOrder
}