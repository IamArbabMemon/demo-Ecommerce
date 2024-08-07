const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.route');
const passport = require('./local-strategy');
const session = require('express-session');
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'secret',
    saveUninitialized:false,
    resave:false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);

try{
    const connection = mongoose.connect('mongodb://127.0.0.1:27017/Fruitables');
       
    app.listen(3000,()=> console.log('App is listening on port 3000'));

}catch(err){
    console.log('Error Occured while starting the app', err);
}

