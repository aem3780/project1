const users = {};
let responseCode;

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response, username) => {
  responseCode = 200;
  let responseJSON = {};
  if (users[username]) {
    responseJSON = {
      users: users[username],
    };
  } else {
    responseJSON = {
      message: 'Username does not exist',
    };
    responseCode = 400;
  }

  return respondJSON(request, response, responseCode, responseJSON);
};

const getUsersMeta = (request, response) => {
  responseCode = 200;
  respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  responseCode = 404;
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, responseCode, responseJSON);
};

const notFoundMeta = (request, response) => {
  responseCode = 404;
  return respondJSONMeta(request, response, responseCode);
};

const addUser = (request, response, body) => {
  responseCode = 400;
  const responseJSON = {
    message: 'Username and Title are both required.',
  };

  if (!body.title || !body.username) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  responseCode = 204;
  if (!users[body.username]) {
    responseCode = 201;
    users[body.username] = {};
    users[body.username].username = body.username;
    users[body.username].booklist = [];
  }

  const book = {
    title: users[body.username].title,
    author: users[body.username].author,
    genre: users[body.username].genre,
    pages: users[body.username].pages,
  };

  users[body.username].booklist.push(book);
  console.log(book);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
