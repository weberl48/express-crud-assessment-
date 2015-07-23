var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || process.env.HOST);
var articleCollection = db.get('articles');
var validate = require('../lib/logic.js');
var para = require ('../lib/para.js');


/* GET home page. */
//CREATE
router.post('/articles', function(req, res, next) {
    var dom = require('../public/javascripts/dom.js');
    var b = req.body;
    var locals = validate(b);
    console.log(b.dark);
    if (locals.errors.length > 0) {
        res.render('new', {
            error: locals.errors
        });
    } else {
        articleCollection.insert({
            title: b.title,
            background: b.background,
            dark: b.dark,
            body: b.body,
            excerpt: b.excerpt
        });
        res.redirect('/');
    }
});
//READ
router.get('/', function(req, res, next) {
    articleCollection.find({}, function(err, records) {
        res.render('index', {
            allArticles: records
        });
    });
});

//READ
router.get('/articles/:id/show', function(req, res, next) {
    articleCollection.findOne({
        _id: req.params.id
    }, function(err, record) {
        res.render('show', {
            allArticles: record
        });
    });
});
//READ
router.get('/articles/:id/edit', function(req, res, next) {
    articleCollection.findOne({
        _id: req.params.id
    }, function(err, record) {
        console.log(record);
        res.render('edit', {
            allArticles: record
        });
    });
});

router.get('/articles/new', function(req, res, next) {
    res.render('new');
});
//UPDATE
router.post('/articles/edit', function(req, res, next) {
    var b = req.body;
    articleCollection.update({
        _id: req.params.id
    }, {
        title: b.title,
        body: b.body,
        excerpt: b.excerpt,
        background: b.background,
        dark: b.dark
    });
    res.redirect('/articles/' + req.params.id + "/show'");
});
//Delete
router.post('/articles/:id/delete', function(req, res, next) {

    articleCollection.remove({
        _id: req.params.id
    });
    res.redirect('/');
});

module.exports = router;
