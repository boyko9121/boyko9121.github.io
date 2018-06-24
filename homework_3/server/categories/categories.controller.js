const Categories = require('./categories.model');

/**
 * Load categorie and append to req.
 */
function load(req, res, next, id) {
  Categories.get(id)
    .then((categorie) => {
      req.categorie = categorie; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get categorie
 * @returns {Categories}
 */
function get(req, res) {
  return res.json(req.categorie);
  //return res.send("OK!!!");
}

/**
 * Create new categorie
 * @property {string} req.body.name - The categoriename of categorie.
 * @property {boolean} req.body.status - The mobileNumber of categorie.
 * @property {boolean} req.body.superAdmin - The categoriename of categorie.
 * @property {string} req.body.permissions - The mobileNumber of categorie.
 * @returns {Categories}
 */
function create(req, res, next) {
  const categorie = new Categories({
    name: req.body.name,
    status: req.body.status,
    outputOrder: req.body.outputOrder,
    photo: req.body.photo
  });

  categorie.save()
    .then(savedcategorie => res.json(savedcategorie))
    .catch(e => next(e));
}

/**
 * Update existing categorie
 * @property {string} req.body.categoriename - The categoriename of categorie.
 * @property {string} req.body.mobileNumber - The mobileNumber of categorie.
 * @returns {Categories}
 */
function update(req, res, next) {
  const categorie = req.categorie;
  categorie.name = req.body.name;
  categorie.status = req.body.status;
  categorie.outputOrder = req.body.outputOrder;
  categorie.photo = req.body.photo;

  categorie.save()
    .then(savedcategorie => res.json(savedcategorie))
    .catch(e => next(e));
}

/**
 * Get categorie list.
 * @property {number} req.query.skip - Number of categories to be skipped.
 * @property {number} req.query.limit - Limit number of categories to be returned.
 * @returns {Categories[]}
 */
function list(req, res, next) {
  let count = 0;
  const {
    limit = 50, skip = 0
  } = req.query;
  Categories.list({
      limit,
      skip
    })
    //  .then(categories => res.json(categories))
    .then(categories => { // Вивід продуктив лише які є в НАЯВНОСТІ
      for (i = 0; i < categories.length; i++) {
        if ((categories[i].status !== true)) {
          categories[i] = "";
        }
        if ((categories.length - 1) == i) {
          count = -1;
        }
      }
      if (count = -1) {
        return res.json(categories);
      }
    })
    .catch(e => next(e));
}


/**
 * Delete categorie.
 * @returns {Categories}
 */
function remove(req, res, next) {
  const categorie = req.categorie;
  categorie.remove()
    .then(deletedcategorie => res.json(deletedcategorie))
    .catch(e => next(e));
}

function searchCategories(req, res, next) {


  console.log(req.body.name + "dffffffffffffffffffffffffffffffffff");
  const oler = req.body.name;
  return oler;
}


module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  searchCategories
};
