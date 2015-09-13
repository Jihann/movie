var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
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
});

/* GET detail page. */
router.get('/movie/:id', function(req, res, next) {
  var id = req.params.id;
  Movie.findById(id, function(err, movie) {
    if (err) {
      console.log('--------------' + err + '---------------');
    }
    res.render('detail', {
      title: '等风来-' + movie.title,
      movie: movie
    });
  });
});

/* GET admin page. */
router.get('/admin/movie', function(req, res, next) {
  res.render('admin', {
    title: '等风来-后台录入页',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      language: '',
      poster: '',
      flash: '',
      summary: ''
    }
  });
});

/* POST admin page. */
router.post('/admin/movie/create', function(req, res, next) {
  console.log('-------------- admin create movie ------------');
  var id = req.body.movie_id;
  console.log('---------- id: ' + id + "------------")
  var newMovie = req.body.movie;
  var _movie;
  if (id) {
    console.log('------------ update -------------');
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log('--------------' + err + '---------------');
      }
      _movie = _.extend(movie, newMovie);
      _movie.save(function(err, movie) {
          if (err) {
            console.log('--------------' + err + '---------------');
          }
          res.redirect('/movie/' + movie._id);
      });
    });
  } else {
    console.log('------------ create -------------');
    console.log('--------- title -------' + req.body.movie.title);
    _movie = new Movie({
      title: newMovie.title,
      director: newMovie.director,
      country: newMovie.country,
      language: newMovie.language,
      year: newMovie.year,
      poster: newMovie.poster,
      flash: newMovie.flash,
      summary: newMovie.summary
    });
    _movie.save(function(err, movie) {
      if (err) {
        console.log('--------------' + err + '---------------');
      }
      res.redirect('/movie/' + movie._id);
    });
  }
});

router.get('/admin/update/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: '我的电影后台更新服务',
        movie: movie
      });
    });
  }
});

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log('--------------' + err + '---------------');
    }
    res.render('list', {
      title: '等风来-列表页',
      movies: movies
    });
  });
});

/* DELETE list  */
router.delete('/admin/delete', function(req, res, next) {
  var id = req.query.id;
  console.log('-------要删除的电影ID为：' + id + '--------');
  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
        if (err) {
          console.log('--------------' + err + '--------------');
        } else {
          res.json({success: 1});
        }
    });
  }
});

//登录
router.post('/user/signin', function(req, res, next) {
  var _user = req.body.user;
  var username = _user.username;
  var password = _user.password;
  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      console.log('------------- user is not exists ------------');
      return res.redirect('/');
    }
    if (user.password !== password) {
      console.log('------------- password is not matched ------------');
      return res.redirect('/');
    } else {
      console.log('------------- password is matched ------------');
      req.session.user = user; //保持当前会话状态
      return res.redirect('/');
    }
  });
});

//注册
router.post('/user/signup', function(req, res, next) {
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
      return res.redirect('/');
    }
    var user = new User(_user);
    user.save(function(err, user) {
      if (err) {
        console.log('--------------' + err + '--------------');
      }
      res.redirect('/admin/userlist');
    });
  });
});

//logout
router.get('/logout', function(req, res, next) {
  delete req.session.user;
  return res.redirect('/');
});

/* GET userlist page. */
router.get('/admin/userlist', function(req, res, next) {
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
});

module.exports = router;
