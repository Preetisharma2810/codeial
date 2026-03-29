const User = require('../models/user');
module.exports.profile = function (req , res){
    /*if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            if(user){
                return res.render('user_profile',{
                    title : "User profile",
                    user : user
                })
            }
            return res.redirect('/users/sign-in');
        });
    } else {
        return res.redirect('/users/sign-in');
    }*/
   if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
    .then(function(user) {
        if (user) {
            return res.render('users_profile', {
                title: "User profile",
                user: user
            });
        }
        return res.redirect('/users/sign-in');
    })
    .catch(function(err) {
        console.log('Error in finding user:', err);
        return res.redirect('/users/sign-in');
    });
} else {
    return res.redirect('/users/sign-in');
}
}
//render the signup page
module.exports.signUp = function(req , res){
   if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : "codeial | Sign Up"
    })
}
//render the signin page
module.exports.signIn = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "codeial | Sign In"
    })
}
//get the sign up data
module.exports.create = function (req , res){
  /*  if(req.body.password != req.body.confirm_password){
        return res.redirect('/sign-up');
    }*/
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
    console.log("tets",req.user);
    //step to authenticate 
    //find the user
    /*User.findOne({email : req.body.email},function (err , user){
        if(err){console.log('error in finding error signin');
            return }
            //handle user found
            if(user){
                //handle password which does not match
                if(user.password != req.body.password){
                    return res.redirect('/sign-up');
                } 
                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            } else {
                //handle user not found
                return res.redirect('/sign-up');
            }
    });*/
    User.findOne({email: req.body.email})
    .then(user => {
        // handle user found
           if (user) {
            // handle password which does not match
               if (user.password != req.body.password) {
                return res.redirect('/sign-up');
            }
            // handle session creation
               res.cookie('user_id', user.id);
               return res.redirect('/users/profile');
            } else {
        // handle user not found
        return res.redirect('/sign-up');
    }
})
.catch(err => {
    console.log('error in finding user in signin', err);
    return;
});
}
module.exports.destroySession = function (req , res){
    req.logout();
    return res.redirect('/users/sign-in');
}