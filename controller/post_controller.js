const Post = require('../models/post');
module.exports.create = function (req , res){
    /*Post.create({
        content : req.body.content ,
        user : req.user._id 
    }, function (err , post){
        if(err){
            console.log('error in creating post');
            return ;
        }
        return res.redirect('/home');
    });*/
    Post.create({
    content: req.body.content,
    user: req.user._id
})
.then((post) => {
    return res.redirect('/users/profile');
})
.catch((err) => {
    console.log('error in creating post', err);
});
}