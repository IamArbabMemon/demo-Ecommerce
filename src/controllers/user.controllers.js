const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');


const registerUser = async(req,res)=>{
    try {
     
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ status: 400, errorMessage: "Empty request body" });
        }

        const { username, password } = req.body;

     
        const hashedPass = await bcrypt.hash(password, 10);

     
        const user =   await userModel.create({ username: username, password: hashedPass });
        console.log(user);
        return res.status(200).json({ status: 200, message: "User has been registered" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, errorMessage: "Internal server error" });
    }
}



module.exports = {
    registerUser
}