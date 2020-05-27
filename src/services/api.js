const url = 'https://salty-sea-14039.herokuapp.com';

function login(email, pass) {
  const data = { email: email, password: pass };
  return fetch(`${url}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function getPlatos() {
  return fetch(`${url}/platos`, {})
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export default {
  login,
  getPlatos,
};
