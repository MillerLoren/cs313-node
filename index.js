var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL);
app.get('/db', function (request, response) {
  db.any('SELECT * FROM leads')
    .then(leads =>{
      response.render('pages/db', {results: leads} );
    })
    .catch(error =>{
      console.log(error);
    });
/*
  pool.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM "public.leads"', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });*/
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/assignments',function(req,res){
  res.render('pages/assignments')
});

app.get('/LEADer',function(req,res){
  res.render('pages/LEADer')
});

app.get('/postalCalc', function(req,res){
  res.render('pages/postalCalc')
});

app.post('/getRate',function(req,res){
  var type = req.body.mailType;
  var weight = req.body.weight;

  res.render('pages/getRate', {type: type, weight: weight});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});