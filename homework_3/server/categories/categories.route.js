const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const categoriesCtrl = require('./categories.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/categories - Get list of categories */
  .get(categoriesCtrl.list)

  /** POST /api/categories - Create new categorie */
  .post(validate(paramValidation.creatСategories), categoriesCtrl.create);
//
router.route('/:categorieId')
  /** GET /api/categories/:categorieId - Get categorie */
  .get(categoriesCtrl.get)

  /** PUT /api/categories/:categorieId - Update categorie */
  .put(validate(paramValidation.updateСategories), categoriesCtrl.update)

  /** DELETE /api/categories/:categorieId - Delete categorie */
  .delete(categoriesCtrl.remove);

/** Load categorie when API with categorieId route parameter is hit */
router.param('categorieId', categoriesCtrl.load);

module.exports = router;
