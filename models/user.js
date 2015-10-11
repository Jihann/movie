/**
 * Created by Jihann on 2015/9/12.
 */

//用mongoose生成model
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;