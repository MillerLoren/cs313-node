var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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