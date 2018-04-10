var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var tools = require('./tools.js');
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
          res.send({id:users.user_id});
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
          var user_id = tools.genId();
          db.none('INSERT INTO users(username, password, user_id, name)values($1, $2, $3, $4)',[registerUsername, registerPassword,user_id,registerName]).then().catch();
          res.send({id:user_id});
        }else{
          console.log(error);
        }
      });
    }else{
      res.send("-2");
    }
  }else{
    res.send("-2");
  }
});
app.get('/contacts', function(req,res){
  var backupid = tools.genId();
  res.render('pages/contacts', {id:backupid,path: req.path});
});
app.post('/getContacts', function(req, res){
  var user = req.body.user;
  db.any("SELECT * FROM leads WHERE user_id = $1", user)
    .then(result=>{
      res.send({results:result});
    })
    .catch(error=>{
      console.log(error);
    });
});
app.post('/deleteContact', function(req, res){
  var user = req.body.user;
  var index = req.body.index;
  db.none("DELETE FROM leads WHERE user_id = $1 AND index = $2", [user, index])
    .then(result=>{
      res.send({results:result});
    })
    .catch(error=>{
      console.log(error);
    });
});
app.get('/logout', function(req, res){
  res.render('pages/logout')
});
app.post('/newContact', function(req, res){
  var user = req.body.user;
  var index = req.body.index;
  var name = req.body.name;
  var company = req.body.company;
  var title = req.body.title;
  var phone = req.body.phone;
  var email = req.body.email;
  db.none("INSERT INTO leads (index, name, company, title, phone, email, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [index, name, company, title, phone, email, user])
    .then(result=>{
      res.send({results:result});
    })
    .catch(error=>{
      console.log(error);
    });
});
app.post('/updateContact', function(req, res){
  var user = req.body.user;
  var index = req.body.index;
  var name = req.body.name;
  var company = req.body.company;
  var title = req.body.title;
  var phone = req.body.phone;
  var email = req.body.email;
  db.any("UPDATE leads SET user_id = $1, index = $2, name = $3, company = $4, title = $5, phone = $6, email = $7 WHERE user_id = $1 AND index = $2", [user, index, name, company, title, phone, email])
    .then(result=>{
      res.send({results:result});
    })
    .catch(error=>{
      console.log(error);
    });
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