var express = require('express');
var router = express.Router();
var Index = require('../controllers/index_controller.js');
var Movie = require('../controllers/movie_controller.js');
var User = require('../controllers/user_controller.js');
var Comment = require('../controllers/comment_controller.js');
var Tag = require('../controllers/tag_controller.js');

// Index
router.get('/', Index.index);

// Movie
router.get('/movie/:id', Movie.detail);
router.get('/admin/movie/create', User.signinRequired, User.adminRequired, Movie.new);
router.post('/admin/movie/create', User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
router.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
router.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
router.delete('/admin/movie/delete', User.signinRequired, User.adminRequired, Movie.del);

// User
router.post('/user/signin', User.signin);
router.post('/user/signup', User.signup);
router.get('/signin', User.showSignin);
router.get('/signup', User.showSignup);
router.get('/logout', User.logout);
router.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);

// Comment
router.post('/user/comment', User.signinRequired, Comment.save);

// Tag
router.get('/admin/tag/create', User.signinRequired, User.adminRequired, Tag.new);
router.post('/admin/tag/create', User.signinRequired, User.adminRequired, Tag.save);
router.get('/admin/tag/list', User.signinRequired, User.adminRequired, Tag.list);

//Results
router.get('/results', Index.search);

module.exports = router;
