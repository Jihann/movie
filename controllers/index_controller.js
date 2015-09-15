/**
 * Created by Jihann on 2015/9/13.
 */
var Movie = require('../models/movie');
var Tag = require('../models/tag');

exports.index = function(req, res, next) {
    console.log('------------- user session -------------');
    console.log(req.session.user);
    var currentUser = req.session.user;
    if (currentUser) {
        //todo 设置到全局中
    }
    Tag
        .find({})
        .populate({path: 'movies', options: {limit: 6}})
        .exec(function(err, tags) {
            if (err) {
                console.log('--------------' + err + '---------------');
            }
            res.render('index', {
                title: '等风来电影首页',
                tags: tags,
                user: currentUser
            });
        });
};

exports.search = function(req, res, next) {
    var tagId = req.query.tag;
    var page = parseInt(req.query.p, 10) || 0;
    var q = req.query.q;
    var count = 2;
    var index = page * count;
    if (tagId) { //分类搜索
        Tag
            .find({_id: tagId})
            .populate({
                path: 'movies'
            })
            .exec(function(err, tags) {
                if (err) {
                    console.log('--------------' + err + '---------------');
                }
                var tag = tags[0] || {};
                var movies = tag.movies || [];
                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: '结果列表首页',
                    keyword: tag.name,
                    currentPage: (page + 1),
                    query: 'tag=' + tagId,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                });
            });
    } else {
        Movie
            .find({title: new RegExp(q + '.*', 'i')})
            .exec(function(err, movies) {
                if (err) {
                    console.log('--------------' + err + '---------------');
                }
                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: '结果列表首页',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                });
            });
    }
};