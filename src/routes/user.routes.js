const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/user.controllers');
const passport = require('../local-strategy');
const session = require('express-session');

// router.use(session({
//     secret:'my secret',
//     saveUninitialized:false,
//     resave:false,
    
// }));
// router.use(passport.initialize());
// router.use(passport.session());



router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(err.status || 500).json({ status: err.status || 500, errorMessage: err.message });
        }
        if (!user) {
            return res.status(400).json({ status: 400, errorMessage: "Authentication failed" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(err.status || 500).json({ status: err.status || 500, errorMessage: err.message });
            }
            return res.status(200).json({ status: 200, message: "User authenticated successfully" });
        });
    })(req, res, next);
});


router.post('/register',registerUser);


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Failed to log out');
      }
      res.clearCookie('connect.sid'); 
      res.status(200).send('Logged out');
    });
    
  });
  

router.get('/check',(req,res)=>{
    console.log(req.session.passport);
    return res.json({username:req.session.passport.user});
});


module.exports = router;