const Role = require('./role.model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Role.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {Role}
 */
function get(req, res) {
  return res.json(req.user);
  //return res.send("OK!!!");
}

/**
 * Create new user
 * @property {string} req.body.name - The username of user.
 * @property {boolean} req.body.status - The mobileNumber of user.
 * @property {boolean} req.body.superAdmin - The username of user.
 * @property {string} req.body.permissions - The mobileNumber of user.
 * @returns {Role}
 */
function create(req, res, next) {
  const user = new Role({
    name: req.body.name,
    status: req.body.status,
    superAdmin: req.body.superAdmin,
    permissions: req.body.permissions
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Role}
 */
function update(req, res, next) {
  const user = req.user;
  user.name = req.body.name;
  user.status = req.body.status;
  user.permissions = req.body.permissions;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Role[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;
  Role.list({
      limit,
      skip
    })
    .then(users => res.json(users))
    //  .then(users => res.sendStatus(200))
    .catch(e => next(e));
}


/**
 * Delete user.
 * @returns {Role}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove
};
