const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getDocumentation = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(documentation);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getDocumentation = getDocumentation;
module.exports.getCSS = getCSS;
