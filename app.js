
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sax = require('sax')
  , crypto = require('crypto')
  , request = require('request')
  , xml = require('xml2js')
  , cron = require('cron').CronJob;

var app = express();

var geoURL = geoTitle = '';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/icon.png', express.static(__dirname + "/public/icon.png"));
app.use('/meta.json', express.static(__dirname + "/public/meta.json"));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Set up the parser
var parser = new xml.Parser();

parser.on('end', function(result) {
	var item = JSON.stringify(result.rss.channel[0].item[0].description); // If something breaks, it's this
	geoTitle = item.match("#[0-9]+ ?[a-zA-Z0-9]+") ? item.match("#[0-9]+ ?[a-zA-Z0-9]+")[0] : '' ; // This probably doesn't work.]
	geoURL = item.match("http://.*/(.*?).(jpe?g|gif|png)")[0]; // I'm sorry
	console.log(geoTitle + " " + geoURL);
});


// Then get the feed
// request('http://geometrydaily.tumblr.com/rss', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//      parser.parseString(body);
//   }
// });
function getFeed() {
	request('http://geometrydaily.tumblr.com/rss', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	     parser.parseString(body);
	  }
	});
}

getFeed();

var cronJob = new cron('00 30 11 * * 1-7', function() {
	getFeed();
}, null, true );

// Etag stuffs
function makeEtag() {
	var hash = crypto.createHash('md5');
    hash.update(new Date().toUTCString());
    return hash.digest('hex');
}


// Routes
app.get('/', function(req,res) {
	res.render('index', { imgTitle: geoTitle, imgPath: geoURL });
});

app.get('/edition', function(req,res) {
	res.set('ETag', makeEtag());
	res.render('index', { imgTitle: geoTitle, imgPath: geoURL });
});

app.get('/sample', function(req,res) {
	res.render('index', { imgTitle: geoTitle, imgPath: geoURL });
});

// app.post('/validate_config', routes.validate);

// app.get('/configure', configure);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
