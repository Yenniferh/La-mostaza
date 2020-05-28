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

export default {
  login,
  getPlatos,
  getStock,
};
