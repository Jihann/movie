/**
 * Created by Jihann on 2015/9/12.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;