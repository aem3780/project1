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

const getUsers = (request, response) => {
  responseCode = 200;
  const responseJSON = {
    users,
  };
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

const updateUser = (request, response, body) => {
  responseCode = 400;
  const responseJSON = {
    message: 'Name and age are both required,',
  };

  if (!body.age || !body.name) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  responseCode = 204;
  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  users[body.name].age = body.age;
  users[body.name].name = body.name;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};