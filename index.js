var express = require('express')
var bodyparser = require('body-parser')
var stylus = require('stylus')
var cookieparser = require('cookie-parser')
var mongo = require('mongoskin')

var db = mongo.db(process.env.MONGOLAB_URI || "mongodb://localhost:27017/jej", {native_parser:true});

var jej = require("./jej")

var app = express()
app.set('port', (process.env.PORT || 5000))

app.set('view engine', 'jade')
app.set('views', __dirname + '/templates')
app.use(stylus.middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: false}))
app.use(cookieparser())

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', function(req, res) {
    var db = req.db;
    var name = (req.cookies.name || "")
    db.collection('messages').find().sort({time:-1}).toArray(function (err, items) {
            res.render('index', {name: name, messages:items});
    });
});

app.post('/form', function(req, res){
    var name = req.body.name
    var message = jej(req.body.message)
    var date = new Date().toISOString()
    if (name && message.length > 0) { 
        var dbEntry = {name: name, message:message, time:date}
        db.collection('messages').insert(dbEntry, function(e) {
            if (e) throw e;
        })
        if (req.cookies.name != name) res.cookie("name", name, { expires: new Date(Date.now() + 604800000) });
    }
    res.redirect("/")
})

app.delete('/delete/:id', function(req, res){
    var db = req.db;
    var messageId = req.params.id;
    db.collection('messages').removeById(messageId, function(e, result) {
        if (e) throw e;
    });
    res.send("")
})

app.listen(app.get('port'))