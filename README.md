A Proxy implementation based on Node.js that is used for serving locally part of the HTTP requests, while redirecting the rest to their original destination.

It is based on another (more traditional) proxy implementation at: https://github.com/pkrumins/nodejs-proxy


This implementation is adding the ability to serve some of the files locally for testing

The local files should be:  (var file = '/API/DataAPI/...more path.../...query...')

1. updated in the ./localFiles directory 

```
  > echo "/questions/4351521/how-to-pass-command-line-arguments-to-node-js" >> ./localFiles
```

2. their content should be written into their MD5 files 

You can discover the name of the local file by using md5.js utility

```
  > node md5.js "http://stackoverflow.com/questions/4351521/how-to-pass-command-line-arguments-to-node-js"
21 May 15:55:51 - Path is:/questions/4351521/how-to-pass-command-line-arguments-to-node-js
21 May 15:55:51 - MD5 is:3a0353d6f73de973dd55572bbeb5af62
```
