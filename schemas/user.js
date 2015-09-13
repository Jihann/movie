/**
 * Created by Jihann on 2015/9/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {
       unique: true,
       type: String
    },
    password: String,
    meta: {
      createdAt: {
          type: Date,
          default: Date.now()
      },
      updateAt: {
          type: Date,
          default: Date.now()
      }
    }
});

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

UserSchema.statics = {
  fetch: function(cb) {
    return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb);
  },
  findById: function(id, cb) {
    return this
        .findOne({_id: id})
        .exec(cb);
  }
};

module.exports = UserSchema;