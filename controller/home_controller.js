const Post = require('../models/post');
module.exports.home = function (req , res){
         /* Post.find({}) , function (err , posts){
            return res.render('home' , {
              title : "home",
              posts : posts
            })
          };*/    
          Post.find({})
  .then((posts) => {
    return res.render('home', {
      title: "home",
      posts : posts
    });
  })
  .catch((err) => {
    console.log(err);
  });  
}
