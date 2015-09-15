/**
 * Created by Jihann on 2015/9/12.
 */
var mongoose = require('mongoose');
var TagSchema = require('../schemas/tag');
var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;