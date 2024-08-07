const { Strategy } = require("passport-local");
const passport = require("passport");
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt');

passport.use(new Strategy(async(username,password,done)=>{
try {
    console.log("inside the strategy method");

    const user = await userModel.findOne({ username });
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const passIsCorrect = await bcrypt.compare(password, user.password);

    if (!passIsCorrect) {
        const error = new Error("Wrong credentials");
        error.status = 400;
        throw error;
    }

    done(null, user);

} catch (error) {
    done(error, null);
}
        
}));



passport.serializeUser((user,done)=>{
    done(null,user.username);
});

passport.deserializeUser(async (username,done)=>{
    console.log("INSIDE DESERIALIZE METHOD")
    try {
        
      const user = await userModel.findOne({username});  

      done(null,user.username);  

    } catch (error) {
        done(error,null);
    }
})

module.exports = passport;

