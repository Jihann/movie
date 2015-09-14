/**
 * Created by Jihann on 2015/9/13.
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');

/* GET detail page. */
exports.detail = function(req, res, next) {
    var id = req.params.id;
    var currentUser = req.session.user;
    Movie.findById(id, function(err, movie) {
        Comment
            .find({movie: id})
            .populate('from', 'username')
            .populate('reply.from reply.to', 'username')
            .exec(function(err, comments) {
                if (err) {
                    console.log('--------------' + err + '---------------');
                }
                console.log(comments);
                res.render('detail', {
                    title: '等风来-' + movie.title,
                    movie: movie,
                    user: currentUser,
                    comments: comments
                });
        });
    });
};

/* GET admin page. */
exports.new = function(req, res, next) {
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
};

/* POST admin page. */
exports.save = function(req, res, next) {
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
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: '我的电影后台更新服务',
                movie: movie
            });
        });
    }
};

/* GET list page. */
exports.list = function(req, res, next) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log('--------------' + err + '---------------');
        }
        res.render('list', {
            title: '等风来-列表页',
            movies: movies
        });
    });
};

/* DELETE list  */
exports.del = function(req, res, next) {
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
};