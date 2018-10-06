/*
    Snacks model
*/

const uuid = require('uuid/v4');

class Snack {
  constructor(name, brand, cost, ozs) {
    this.id = uuid();
    this.name = name;
    this.brand = brand;
    this.cost = cost;
    this.ozs = ozs;
  }
}

const gaSnacks = [
  new Snack("Chips", "Frito Lay", 1.5, 12),
];

// ********************************************************
function getAll() {
  return gaSnacks;
}

// ********************************************************
function find(findId) {
  return gaSnacks.find(snack => snack.id === findId);
}

// ********************************************************
function insert(name, brand, cost, ozs) {
  const snack = new Snack(name, brand, cost, ozs);
  gaSnacks.push(snack);
  return snack;
}

// ********************************************************
function del(id) {
  // const snack = find(id);
  // const index = gaSnacks.indexOf(snack);

  const index = gaSnacks.findIndex(snack => snack.id === id);
  if (index < 0)
    return null;
  const snack = gaSnacks[index];
  gaSnacks.splice(index, 1);
  return snack;
}

// ********************************************************
function put(id, name, brand, cost, ozs) {
  // if snack not found, return null - can't PUT
  const snack = find(id);
  if (!snack)
    return null;

  // update the snack
  snack.name = name;
  snack.brand = brand;
  snack.cost = cost;
  snack.ozs = ozs;

  return snack;
}

module.exports = {
  getAll,
  find,
  insert,
  del,
  put,
};
