
const express = require('express');
const model = require('./model');

const router = express.Router();

/* ============================================================================
  MIDDLEWARE
  =========================================================================== */

// ===========================================================
// requireNameParam()
// Middleware to require req.body.name be passed
// ===========================================================
function requiredParams(req, res, next) {
  // check that params were passed
  if (!req.body.name || !req.body.brand || !req.body.cost || !req.body.ozs) {
    res.status(400).json({ error: { message: 'must pass name, brand, cost, ozs' } });
    return;
  }
  next();
}

/* ============================================================================
  REST HANDLERS
  =========================================================================== */

/* ===========================================================
  GET /snacks
  Get all snacks
  http --json POST localhost:3000/snacks name=Snickers brand=Nabisco cost=2 ozs=8
  http --json POST localhost:3000/snacks name=Kisses brand=Hershies cost=1 ozs=4
  http --json GET localhost:3000/snacks
  =========================================================== */
router.get('', (req, res, next) => {
  console.log("~~ GET /snacks");
  res.json(model.getAll());
});

/* ===========================================================
  POST /snacks name=xx brand=xx cost=## ozs=##
  Add a snack
  http --json POST localhost:3000/snacks name=Snickers brand=Nabisco cost=2 ozs=8
  =========================================================== */
router.post('', requiredParams, (req, res, next) => {
  console.log("~~ POST /snacks w/ all params");
  const { name, brand, cost, ozs } = req.body;
  // respond to caller
  res.status(201).json(model.insert(name, brand, cost, ozs));
});

/* ==========================================================
  GET /snacks/:id
  http --json POST localhost:3000/snacks name=Snickers brand=Nabisco cost=2 ozs=8
  http --json POST localhost:3000/snacks name=Kisses brand=Hershies cost=1 ozs=4
  http --json GET localhost:3000/snacks/#####
 =========================================================== */
router.get('/:id', (req, res, next) => {
  console.log("~~ GET /snack/:id");
  const { id } = req.params;

  const snack = model.find(id);

  if (!snack) {
    res.status(404).json({ error: { message: 'unknown snack' } });
    return;
  }

  res.status(201).json(snack);
});

/* ===========================================================
   PUT /snacks/:id name | brand | cost | ozs
   Update a snack with some new information
   http --json POST localhost:3000/snacks name=Snickers brand=Nabisco cost=2 ozs=8
   http --json POST localhost:3000/snacks name=Kisses brand=Hershies cost=1 ozs=4
   http --json PUT localhost:3000/snacks/##### brand=Mars
   http --json GET localhost:3000/snacks
  =========================================================== */
router.put('/:id', (req, res, next) => {
  console.log("~~ PUT /snack/:id name | brand | cost | ozs");
  console.log("~~~~ id=", req.params.id);
  const { name, brand, cost, ozs } = req.body;

  const snack = model.find(req.params.id);
  if (!snack) {
    res.status(404).json({ error: { message: 'unknown snack' } });
    return;
  }

  snack.name = (name) ? name : snack.name;
  snack.brand = (brand) ? brand : snack.brand;
  snack.cost = (cost) ? cost : snack.cost;
  snack.ozs = (ozs) ? ozs : snack.ozs;

  // respond to caller
  res.status(200).json(snack);
});

/* ===========================================================
  DELETE /snacks/:id
  Delete a snack
  http --json POST localhost:3000/snacks name=Snickers brand=Nabisco cost=2 ozs=8
  http --json POST localhost:3000/snacks name=Kisses brand=Hershies cost=1 ozs=4
  http --json DELETE localhost:3000/snacks/#####
  http --json GET localhost:3000/snacks
 ===========================================================  */
router.delete('/:id', (req, res, next) => {
  console.log("~~ DELETE /snack/:id");
  console.log("~~~~ id=", req.params.id);

  const snack = model.del(req.params.id);
  if (!snack) {
    res.status(404).json({ error: { message: 'unknown snack' } });
    return;
  }
  res.status(200).json(snack);
});

module.exports = router;
