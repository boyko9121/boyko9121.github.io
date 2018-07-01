const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const roleCtrl = require('./role.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(roleCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.creatRole), roleCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(roleCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateRole), roleCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(roleCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', roleCtrl.load);

module.exports = router;
