const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const productsCtrl = require('./products.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/productss - Get list of productss */
  .get(productsCtrl.list)

  /** POST /api/productss - Create new products */
  .post(validate(paramValidation.creatProducts), productsCtrl.create);
//
router.route('/:productsId')
  /** GET /api/productss/:productsId - Get products */
  .get(productsCtrl.get)

  /** PUT /api/productss/:productsId - Update products */
  .put(validate(paramValidation.updateProducts), productsCtrl.update)

  /** DELETE /api/productss/:productsId - Delete products */
  .delete(productsCtrl.remove);

/** Load products when API with productsId route parameter is hit */
router.param('productsId', productsCtrl.load);

module.exports = router;
