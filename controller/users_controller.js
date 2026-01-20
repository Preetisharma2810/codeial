const User = require('../models/user');
module.exports.profile = function (req , res){
    return res.render('users_profile',{
        title : "profile"
    });
}
//render the signup page
module.exports.signUp = function(req , res){
    return res.render('user_sign_up',{
        title : "codeial | Sign Up"
    })
}
//render the signin page
module.exports.signIn = function(req , res){
    return res.render('user_sign_in',{
        title : "codeial | Sign In"
    })
}
//get the sign up data
module.exports.create = function (req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/sign-up');
    }
/*   User.findOne({email : req.body.email},function(err , user){
        if(err){console.log('error in sugn up'); return}

            if(!user){
                User.create(req.body , function (err , user){
                    if(err){console.log('error in creating sign up'); return}
                        return res.redirect('/users/sign-in')
                })
            }else{
                return res.redirect('/sign-up');
            }*/
            User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return User.create(req.body)
                    .then(() => {
                        return res.redirect('/users/sign-in');
                    });
                } else {
                    return res.redirect('/sign-up');
                }
            })
            .catch(err => {
                console.log("Error in sign up:", err);
            });
        }
//get the sign in data
module.exports.createSession = function (req , res){
    //todo
}