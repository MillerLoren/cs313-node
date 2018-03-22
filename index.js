var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();

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
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
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
app.post('/login', function(req,res){
  var loginUsername = req.body.login_username;
  var loginPassword = req.body.login_password;
  if(loginUsername){
    var sql = "SELECT username, password, user_id FROM users WHERE username = '" + loginUsername + "'";
    db.one(sql)
    .then(users =>{
      if(loginPassword != null){
        if(users.password != loginPassword){
          res.send("-1");
        }else{
          res.redirect('/contacts?id=' + users.user_id);
        }
      }else{
        res.send("-2");
      }
    })
    .catch(error =>{
      console.log(error);
    });
  }else{
    res.send("-2");
  }
});
app.post('/register', function(req,res){
  var registerUsername = req.body.register_username;
  var registerName = req.body.register_name;
  var registerPassword = req.body.register_password;
  if(registerUsername){
    if(registerPassword){
      db.one("SELECT username FROM users WHERE username = $1",registerUsername)
      .then(users =>{
        res.send("-3");
      })
      .catch(error =>{
        if(error.received == "0"){
          console.log("creating new user"); //todo
          var user_id = genID();
          console.log("user_id: " + user_id);
          db.none('INSERT INTO users(username, password, user_id, name)values($1, $2, $3, $4)',[registerUsername, registerPassword,user_id,registerName]).then().catch();
          res.redirect('/contacts?id=' + user_id);
        }else{
          console.log(error);
        }
      });
    }else{
      res.send("-2")
    }
  }else{
    res.send("-2");
  }
});
app.get('/guest', function(req,res){
  id = genID();
  res.redirect('/contacts?id=' + id);
});
app.post('/contact', function(req,res){
  res.render('pages/contacts', {id: id});
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
function genID(){
  var rnd = Math.floor(Math.random() * 10000000000) + 1;
  var stop = false;
  while(stop = false){
    console.log("trying to find number" + rnd);
    db.one('SELECT user_id FROM users WHERE user_id=$1', rnd)
    .then(id=>{
      console.log("Function: genID, id - "+id.user_id+" - present");
      rnd = Math.floor(Math.random() * 10000000000) + 1;
      stop = false;
    })
    .catch(error=>{
      if(error.received = "0"){
        console.log("Found new id");
        stop = true;
      }else{
        console.log(error);
        stop = true;
      }
    });
  }
  return rnd;
}