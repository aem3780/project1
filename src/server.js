// pull in http module
const http = require('http');
// url module for parsing url string
const url = require('url');
// querystring module for parsing querystrings from url
const query = require('querystring');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    // Recompiles the body of a request, and then calls the appropriate handler once completed
    const body = [];
    const res = response;

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      // Turn the body array into a single entity using Buffer.concat
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      // Once we have the bodyParams object, we will call the handler function. We then
      // proceed much like we would with a GET request.
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};
// handle GET requests
const handleGet = (request, response, parsedUrl) => {
  // route to correct method based on url
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};
// handle HEAD requests
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);
  // check if method was POST, GET or HEAD
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else {
    handleHead(request, response, parsedUrl);
  }
};
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
