/**
 * Created by Jihann on 2015/9/13.
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Tag = require('../models/tag');
var _ = require('underscore');
//上传
var fs = require('fs');
var path = require('path');

/* GET detail page. */
exports.detail = function(req, res, next) {
    var id = req.params.id;
    var currentUser = req.session.user;
    Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
        if (err) {
            console.log(err);
        }
    });
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
    Tag.find({}, function(err, tags) {
        if (err) {
            console.log(err);
        }
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
                summary: '',
                tagName: ''
            },
            tags: tags
        });
    });
};

//上传图片
exports.savePoster = function(req, res, next) {
    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalname = posterData.originalname;

    if (originalname) {
        console.log('------------- 上传 --------------');
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();
            var type = posterData.mimetype.split('/')[1];
            console.log('-----------文件类型为：' + type + '-------------');
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../', '/public/upload/' + poster);
            fs.writeFile(newPath, data, function(err) {
                req.poster = poster;
                next();
            });
        });
    } else {
        next();
    }
};

/* POST admin page. */
exports.save = function(req, res, next) {
    console.log('-------------- admin create movie ------------');
    var id = req.body.movie._id;
    console.log('---------- id: ' + id + "------------")
    var newMovie = req.body.movie;
    var _movie;
    if (req.poster) {
        newMovie.poster = req.poster;
    }
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
        _movie = new Movie(newMovie);
        var tagId = newMovie.tag;
        var tagName = newMovie.tagName;
        _movie.save(function(err, movie) {
            if (err) {
                console.log('--------------' + err + '---------------');
            }
            if (tagId) {
                Tag.findById(tagId, function(err, tag) {
                    tag.movies.push(movie._id);
                    console.log(movie._id);
                    tag.save(function(err, tag) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            } else if (tagName) {
                var tag = new Tag({
                    name: tagName,
                    movies: [movie._id]
                });
                tag.save(function(err, tag) {
                   if (err) {
                       console.log(err);
                   }
                    movie.tag = tag._id;
                    movie.save(function(err, movie) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            }
        });
    }
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            Tag.find({}, function(err, tags) {
                res.render('admin', {
                    title: '我的电影后台更新服务',
                    movie: movie,
                    tags: tags
                });
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