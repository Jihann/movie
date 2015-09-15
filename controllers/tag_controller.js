/**
 * Created by Jihann on 2015/9/14.
 */
var Tag = require('../models/tag');

exports.new = function(req, res, next) {
    res.render('tag', {
       title: '电影分类页',
       tag: {
           name: ''
       }
    });
};

exports.save = function(req, res, next) {
    var _tag = req.body.tag;
    var tag = new Tag(_tag);
    tag.save(function(err, tag) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/tag/list');
    });
};

exports.list = function(req, res, next) {
    console.log('-------------- taglist ------------');
    Tag.fetch(function(err, tags) {
        if (err) {
            console.log('--------------' + err + '---------------');
        }
        res.render('tag_list', {
            title: '电影分类列表页',
            tags: tags
        });
    });
};