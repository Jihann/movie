/**
 * Created by Jihann on 2015/9/13.
 */
var Movie = require('../models/movie');

exports.index = function(req, res, next) {
    console.log('------------- user session -------------');
    console.log(req.session.user);
    var currentUser = req.session.user;
    if (currentUser) {
        //todo 设置到全局中
    }
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log('--------------' + err + '---------------');
        }
        res.render('index', {
            title: '等风来电影首页',
            movies: movies,
            user: currentUser
        });
    });
};