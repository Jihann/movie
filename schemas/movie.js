/**
 * Created by Jihann on 2015/9/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = new Schema({
    title: String,
    director: String,
    country: String,
    language: String,
    poster: String,
    flash: String,
    year: Number,
    summary: String,
    tagName: String,
    pv: {
      type: Number,
      default: 0
    },
    tag: {
        type: ObjectId,
        ref: 'Tag'
    },
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

MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

MovieSchema.statics = {
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

module.exports = MovieSchema;