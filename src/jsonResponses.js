// Create object in memory
const users = {};
let responseCode;

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

// return user object as JSON
const getUsers = (request, response) => {
  responseCode = 200;
  let responseJSON = {};
  if (users) {
    responseJSON = {
      users,
    };
  } else {
    responseJSON = {
      message: 'Username does not exist',
    };
    // console.log(users);
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

// function to add a user from a POST body
const addUser = (request, response, body) => {
  responseCode = 400;
  // default json message
  const responseJSON = {
    message: 'Username and Title are both required.',
  };

  if (!body.title || !body.username) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // default status code to 204 updated
  responseCode = 204;
  // If the user doesn't exist yet
  if (!users[body.username]) {
  // Set the status code to 201 (created) and create an empty user
    responseCode = 201;
    users[body.username] = {};
    users[body.username].booklist = [];
  }
  // add or update fields for this user name
  users[body.username].username = body.username;

  const newBook = {
    title: body.title,
    author: body.author,
    genre: body.genre,
    pages: body.pages,
  };

  users[body.username].booklist.push(newBook);
  console.log(newBook);

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};
// public exports
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
