module.exports.home = function (req , res){
    console.log(req.cookie);
    return res.render('home',{
        title : "home"
    });
}