var express = require('express');
var router = express.Router();
var db =require('monk')(process.env.MONGOLAG_URI || "localhost/articles");
var articleCollection = db.get('articles');

/* GET home page. */
//CREATE
router.post('/articles', function(req,res,next){
  var b = req.body;
  articleCollection.insert({title:b.title, background:b.background, dark:b.dark, body:b.body,excerpt:b.excerpt});
  res.redirect('/view');
});
//READ
router.get('/', function(req,res,next) {
  articleCollection.find({}, function(err,records){
    res.render('index', {allArticles:records});
  });
});

//READ
router.get('/article/:id/show', function(req,res,next){
  articleCollection.findOne({_id:req.params.id}, function(err,record){
  res.render('show',{allArticles:record});
  });
});
//READ
router.get('/article/:id/edit', function(req,res,next) {
  articleCollection.findOne({_id:req.params.id}, function(err,record){
    console.log(record);
  res.render('edit',{allArticles:record});
  });
});

router.get('/articles/new', function(req,res,next){
  res.render('new');
});




module.exports = router;
