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

function createAdmin({
  email,
  password,
  displayName,
  iddoc,
  address,
  phonenumber,
}) {
  const data = {
    email: email,
    password: password,
    displayName: displayName,
    iddoc: iddoc,
    address: address,
    phonenumber: phonenumber,
  };
  return fetch(`${url}/admin`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}

function createMesero({
  email,
  password,
  displayName,
  iddoc,
  address,
  phonenumber,
}) {
  const data = {
    email: email,
    password: password,
    displayName: displayName,
    iddoc: iddoc,
    address: address,
    phonenumber: phonenumber,
  };
  return fetch(`${url}/mesero`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}
/* Menu */
function getPlatos() {
  return fetch(`${url}/platos`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function createPlato(name, desc, cat, precio, tiempo, file) {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('desc', desc);
  formData.append('cat', cat);
  formData.append('precio', precio);
  formData.append('tiempo', tiempo);
  formData.append('file', file);

  return fetch(`${url}/plato`, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}

function deletePlato(id) {
  const data = { id: id };
  return fetch(`${url}/plato`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}

/* Fin de Menu */

/* Inventario */
function getStock() {
  return fetch(`${url}/stock`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function createStock(nombre, cantidad, medida) {
  const data = { nombre: nombre, cantidad: cantidad, medida: medida };
  return fetch(`${url}/stock`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}

function deleteStock(id) {
  const data = { id: id };
  return fetch(`${url}/stock`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}
/* Fin inventario */

/* Ordenes */
function getOrders() {
  return fetch(`${url}/ordenes/2020/5`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function deleteOrder(idorden, year, mes) {
  const data = { idorden: idorden, year: year, mes: mes };
  return fetch(`${url}/orden/eliminar`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}
/* Fin Ordenes */

/* Descuentos */
function getDescuentos() {
  return fetch(`${url}/bono??aa=2020`, {})
    .then(function(res) {
      return res.json();
    })
    .catch((err) => console.log(err));
}

function createDescuento(dct, mm, aa) {
  const data = { dct: dct, mm: mm, aa: aa };
  return fetch(`${url}/bono`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}
function deleteDescuento(idbono, year, mes) {
  const data = { idbono: idbono, year: year, mes: mes };
  return fetch(`${url}/bono/eliminar`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((err) => console.log(`Error: ${err}`));
}
/* Fin descuentos */

export default {
  login,
  getPlatos,
  getStock,
  getOrders,
  createStock,
  getDescuentos,
  deleteStock,
  deleteOrder,
  deleteDescuento,
  deletePlato,
  createDescuento,
  createAdmin,
  createMesero,
  createPlato,
};
