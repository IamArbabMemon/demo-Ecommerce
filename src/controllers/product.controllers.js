const productModel = require('../models/products.model');

const addProduct = async(req,res)=>{
try {
        if(!req.body)
            return res.status(400).json({ErrorMessage:"Empty request body"});
    
        const {productName,description,quantity,price} = req.body;
    
     const product = await productModel.create({
            productName,
            description,
            quantity,
            price
        });
    
        return res.status(200).json({Message:`Product has been added to the database\n ${product}`});
} catch (error) {
    return res.status(500).json({ErrorMessage:error.message});
}
};


const deleteProduct = async(req,res)=>{
try {
        if(!req.params.productID)
            return res.status(400).json({ErrorMessage:"Please insert productID in request parameter"});
    
        const {productID} = req.params;
        
        console.log(productID);
    
        const deletedProduct = await productModel.deleteOne({_id:productID});
        
        console.log(deletedProduct);

        return res.status(200).json({success:true,message:`has been deleted`});
} catch (error) {
    return res.status(500).json({ErrorMessage:error.message});
}
    
};


const getProducts = async(req,res)=>{
    try{
        const products = await productModel.find();
    return res.status(200).json({success:true,products});
    }catch(error){
        return res.status(500).json({success:false,products:null,ErrorMessage:error.message});
    }
    
}


const editProduct = async(req,res)=>{
    if (!req.body) return res.status(400).json({ error: "Empty Request Body" });
    try {
      await productModel.findOneAndReplace(
        { _id: req.body.productID },
        req.body
      );
  
      return res
        .status(200)
        .json({ success: "Product details has been updated" });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    } 
}


module.exports = {
    addProduct,
    deleteProduct,
    getProducts,
    editProduct
}

