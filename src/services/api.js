const url = 'http://localhost:8080';

function login(email, pass) {
  const data = { email: email, password: pass };
  return fetch(`${url}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(`Error: ${err}`));
}

function getPlatos() {
  return fetch(`${url}/platos`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function getStock() {
  return fetch(`${url}/stock`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function login2() {
  var data = { email: 'me@me.com', password: '123456' };

  fetch(`${url}/login`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
}

export default {
  login,
  getPlatos,
  getStock,
  login2,
};
