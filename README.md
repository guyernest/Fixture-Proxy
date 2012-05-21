A Proxy implementation based on Node.js that is used for serving locally part of the HTTP requests, while redirecting the rest to their original destination.

It is based on another (more traditional) proxy implementation at: https://github.com/pkrumins/nodejs-proxy


This implementation is adding the ability to serve some of the files locally for testing

The local files should be:  (var file = '/API/DataAPI/...more path.../...query...')

1. updated in the ./localFiles directory and (echo file >> ./localFiles)
2. their content should be written into their MD5 files (var hash1 = crypto.createHash('md5').update(file).digest('hex');)