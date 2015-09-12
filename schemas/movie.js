/**
 * Created by Jihann on 2015/9/12.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    country: String,
    language: String,
    poster: String,
    flash: String,
    year: Number,
    meta: {
      createdAt: {
          type: Date,
          default: Date.now()
      },
      updateAt: {
          type: Date,
          default: Date.now()
      }
    },
    summary: String
});

MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    this.next();
});

MovieSchema.statics = {
  fetch: function(callback) {
    return this
        .find({})
        .sort('meta.updateAt')
        exec(callback);
  },
  findById: function(id, callback) {
    return this
        .findOne({_id: id})
        .sort('meta.updateAt')
        exec(callback);
  }
};

module.exports = MovieSchema;