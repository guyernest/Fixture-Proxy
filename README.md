Proxy for Serving Test Fixtures
=============================

A Proxy implementation based on Node.js that is used for serving locally part of the HTTP requests, while redirecting the rest to their original destination.

It is based on another (more traditional) proxy implementation at: https://github.com/pkrumins/nodejs-proxy

Who is it for?
--------------

This proxy is for developers and testers who are developing (or testing) the GUI of a web application.

Since the API that is serving some of the data, for AJAX calls or simple Form calling either does not exist yet, or might return different results each time, it is easier if you can control the content of some of these responses.

When using Selenium and WebDriver for checking the validity of the GUI, it is best to be able to expect specific values to be displayed. If the server might return different values, the test might be too general ("*Is there a button?*", *"Is there a category list?"*), or might break too often. When fixing the server response, it is possible to test for specific values (*"Are there 5 categories displayed?"*).

It is also possible to modify the server responses and create extreme values (for example, *"No Categories", "Many Categories", "Duplicate Categories", "Long name Categories"*...). This can be done easily as part of the test by modifying the local text file.

How to make it work?
--------------------

After installing [node.js], simple download the zipped project, unzip it and

```
 > node proxy.js
```

Then configure your browser proxy setting to:

Host : localhost
port : 3000

In Firefox: Preferences (CMD+,) -> Advanced -> Network -> Connection -> Settings... -> Manual Proxy Configuration

In Chrome: Settings (CMD+,) -> Show Advanced Settings -> Network -> Change Proxy Settings...

You can make sure that you installed everything correctlly, you can go to [node.js] site, and you should see a gray cicle around the logo which was sevrved from the local proxy.


How to add Local Fixtures?
--------------------------


The local files should include the full URL address:  (var file = 'http://www.domain.com/API/DataAPI/...more path.../...&query=value&...')

- update each local URL path in the ./localFiles list 

```
  > echo "http://nodejs.org/images/logo.png" >> ./localFiles
```

You should use the local proxy mainly for text files (JSON responses), but it should work for image files as well.

- update its content into their MD5 files 

You can discover the name of the local file by using md5.js utility

```
  > node md5.js "http://nodejs.org/images/logo.png"
27 May 15:47:55 - url is:http://nodejs.org/images/logo.png
27 May 15:47:55 - MD5 is:66b7938bb7d32e555eafea6a1f1ad533
```

[node.js]: http://nodejs.org//