var crypto = require("crypto");
var sys  = require('util');


var url = process.argv[2];
sys.log('url is:'+url);
var hash1 = crypto.createHash('md5').update(url).digest('hex');
sys.log('MD5 is:'+hash1);
