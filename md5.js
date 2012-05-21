var crypto = require("crypto");
var sys  = require('util');


var url = process.argv[2];
var file = require('url').parse(url).path;
sys.log('Path is:'+file);
var hash1 = crypto.createHash('md5').update(file).digest('hex');
sys.log('MD5 is:'+hash1);
