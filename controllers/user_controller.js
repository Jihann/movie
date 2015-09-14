/**
 * Created by Jihann on 2015/9/13.
 */
var User = require('../models/user');

exports.showSignin = function(req, res, next) {
    res.render('signin', {
        title: '用户登录页面'
    });
};

exports.showSignup = function(req, res, next) {
    res.render('signup', {
        title: '用户注册页面'
    });
};

//登录
exports.signin =  function(req, res, next) {
    var _user = req.body.user;
    var username = _user.username;
    var password = _user.password;
    console.log('------------ username: ' + username + '-------------');
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log('------------- user is not exists ------------');
            return res.redirect('/signup');
        }
        if (user.password !== password) {
            console.log('------------- password is not matched ------------');
            return res.redirect('/signin');
        } else {
            console.log('------------- password is matched ------------');
            req.session.user = user; //保持当前会话状态
            return res.redirect('/');
        }
    });
};

//注册
exports.signup =  function(req, res, next) {
    var _user = req.body.user;
    console.log(_user);
    //将前面的User.find方法改成User.findOne就ok了，
    // find返回的是 '列表'，没找到就是[], findOne返回的是单个对象，没找到匹配就是null
    User.findOne({username: _user.username}, function(err, user) {
        console.log(user);
        if (err) {
            console.log(err);
        }
        if (user) {
            console.log('------------ user is not null ----------')
            return res.redirect('/signin');
        }
        var user = new User(_user);
        user.save(function(err, user) {
            if (err) {
                console.log('--------------' + err + '--------------');
            }
            res.redirect('/');
        });
    });
};

//logout
exports.logout =  function(req, res, next) {
    delete req.session.user;
    return res.redirect('/');
};

//userlist
exports.list = function(req, res, next) {
    console.log('-------------- userlist ------------');
    User.fetch(function(err, users) {
        if (err) {
            console.log('--------------' + err + '---------------');
        }
        res.render('user_list', {
            title: '等风来-用户列表页',
            users: users
        });
    });
};

// 用户权限中间件
exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }
    next();
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.role <= 10) {
        return res.redirect('/signin');
    }
    next();
}