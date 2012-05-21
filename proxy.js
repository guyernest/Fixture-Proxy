// Full Git project can be found at: https://github.com/pkrumins/nodejs-proxy
// This implementation is adding the ability to serve some of the files locally for testing
// The local files should be:  (var file = '/API/DataAPI/GuestSatisfactionWithTrend/empty/drivingFacet=org&clientId=qdoba')
//  * updated in the ./localFiles directory and (echo file >> ./localFiles)
//  * their content should be written into their MD5 files (var hash1 = crypto.createHash('md5').update(file).digest('hex');)

var http = require('http');
var sys  = require('util');
var fs   = require('fs');
var crypto = require("crypto");

var iplist    = [];
var localFiles    = [];

fs.watchFile('./iplist', function(c,p) { update_iplist(); });
fs.watchFile('./localFiles', function(c,p) { update_localFiles(); });

function update_iplist() {
  sys.log("Updating iplist.");
  iplist = fs.readFileSync('./iplist').toString().split('\n')
           .filter(function(rx) { return rx.length });
}

function update_localFiles() {
  sys.log("Updating local Files list.");
  localFiles = fs.readFileSync('./localFiles').toString().split('\n')
           .filter(function(rx) { return rx.length })
           .map(function(rx) { return RegExp(rx) });
}


function ip_allowed(ip) {
  for (i in iplist) {
    if (iplist[i] == ip) {
      return true;
    }
  }
  return true; // I don't need the ip blocking yet
}

function serve_local(query) {
  for (i in localFiles) {
    if (localFiles[i].test(getPath(query))) {
      return true;
    }
  }
  return false;
}

function deny(response, msg) {
  response.writeHead(401);
  response.write(msg);
  response.end();
}

function getPath(request) {
	var path = require('url').parse(request.url).path;
	return path;
}

http.createServer(function(request, response) {
  var ip = request.connection.remoteAddress;
  if (!ip_allowed(ip)) {
    msg = "IP " + ip + " is not allowed to use this proxy";
    deny(response, msg);
    sys.log(msg);
    return;
  }

  if (serve_local(request)) {
  	var path = getPath(request);
    msg = "Query " + path + " has been served locally by proxy configuration";
    sys.log(msg);
    var hash1 = crypto.createHash('md5').update(path).digest('hex');
    response.writeHead(200, {
	  'Content-Type': 'text/plain'
	});
    var s = fs.ReadStream(hash1);
	s.on('data', function(d) {
	  response.write(d);
	});

	s.on('end', function() {
	  response.end();
	});
    return;
  }


  sys.log(ip + ": " + request.method + " " + request.url);
  var proxy = http.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function(proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}).listen(3000);

update_iplist();
update_localFiles();