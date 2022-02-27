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
  // console.log(users[username]);
  let responseJSON = {};
  if (users) {
    responseJSON = {
      users,
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
    users[body.username].booklist = [];
  }
  users[body.username].username = body.username;

  const newBook = {
    title: body.title,
    author: body.author,
    genre: body.genre,
    pages: body.pages,
  };

  users[body.username].booklist.push(newBook);
  console.log(newBook);

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
