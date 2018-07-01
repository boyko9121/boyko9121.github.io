const express = require('express');
const userRoutes = require('./server/user/user.route');
const categoriesRoutes = require('./server/categories/categories.route');
const authRoutes = require('./server/auth/auth.route');
const roleRoutes = require('./server/role/role.route');
const productsRoutes = require('./server/products/products.route')
const router = express.Router(); // eslint-disable-line new-cap
// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/role', roleRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
