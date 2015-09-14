/**
 * Created by Jihann on 2015/9/13.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;