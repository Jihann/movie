var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '我的电影 首页',
    movies: [{
      title:'奇妙世纪 08 梦的还原器',
      _id: 1,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    },{
      title:'奇妙世纪 08 梦的还原器',
      _id: 2,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    },{
      title:'奇妙世纪 08 梦的还原器',
      _id: 3,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    },{
      title:'奇妙世纪 08 梦的还原器',
      _id: 4,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    },{
      title:'奇妙世纪 08 梦的还原器',
      _id: 5,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    },{
      title:'奇妙世纪 08 梦的还原器',
      _id: 6,
      poster:'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF'
    }]
  });
});

/* GET detail page. */
router.get('/movie/:id', function(req, res, next) {
  res.render('detail', {
    title: '我的电影 详情页',
    movie: {
      title: '机器战警',
      director: '何塞.帕迪利亚',
      country: '美国',
      year: 2014,
      language: '英语',
      poster: 'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF',
      flash: 'http://player.youku.com/player.php/sid/XODQ0NDk4MTA0/v.swf',
      summary: '她说好看，他又说不好看，到底好看不好看，你来你说了算！！！'
    }
  });
});

/* GET admin page. */
router.get('/admin/movie', function(req, res, next) {
  res.render('admin', {
    title: '我的电影 后台录入页',
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

/* GET list page. */
router.get('/admin/list', function(req, res, next) {
  res.render('list', {
    title: '我的电影 列表页',
    movies: [{
      _id: 1,
      title: '机器战警',
      director: '何塞.帕迪利亚',
      country: '美国',
      year: 2014,
      language: '英语',
      poster: 'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF',
      flash: 'http://player.youku.com/player.php/sid/XODQ0NDk4MTA0/v.swf',
      summary: '她说好看，他又说不好看，到底好看不好看，你来你说了算！！！'
    }]
  });
});

module.exports = router;
