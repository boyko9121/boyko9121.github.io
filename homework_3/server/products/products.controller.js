const Products = require('./products.model');
const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');
const ObjectId = require('mongoose').ObjectId;
/**
 * Load products and append to req.
 */
function load(req, res, next, id) {
  Products.findById(id)
    .populate('categories')
    .exec((err, doc) => {
      if (err) throw err;
      return res.json(doc);
    })
}

/**
 * Get products
 * @returns {Products}
 */
function get(req, res) {

  // return res.json(req.products);
  //return res.send("OK!!!");
}

/**
 * Create new products
 * @property {string} req.body.name - The productsname of products.
 * @property {boolean} req.body.status - The mobileNumber of products.
 * @property {boolean} req.body.superAdmin - The productsname of products.
 * @property {string} req.body.permissions - The mobileNumber of products.
 * @returns {Products}
 */



function create(req, res, next) {
  let categorie = req.body.categorie;
  Categories.findOne({
    name: categorie
  }, function(err, doc) {
    if (doc !== null) {

      const products = new Products({
        name: req.body.name,
        photo: req.body.photo,
        categories: doc._id,
        price: {
          value: req.body.price.value,
          currency: req.body.price.currency
        },
        availability: req.body.availability,
        dimensions: {
          length: req.body.dimensions.length,
          heigth: req.body.dimensions.heigth,
          width: req.body.dimensions.width
        },
        promotional: req.body.promotional,
        sizeDiscount: req.body.sizeDiscount,
        line: req.body.line
      });
      console.log('products', products);
      products.save()
        .then(savedproducts => {
          console.log('products2', savedproducts);
          return res.json({
            'test': savedproducts
          });
        })
        .catch(e => next(e));
    }
  })
}

/**
 * Update existing products
 * @property {string} req.body.productsname - The productsname of products.
 * @property {string} req.body.mobileNumber - The mobileNumber of products.
 * @returns {Products}
 */
function update(req, res, next) {
  console.log("LOIUDJKDKDKDKD" + req.body);
  const products = req.products;
  products.name = req.body.name;
  products.categorie = req.body.categorie;
  products.photo = req.body.photo;
  products.price.value = req.body.price.value;
  products.price.currency = req.body.price.currency;
  products.availability = req.body.availability;
  products.dimensions.length = req.body.dimensions.length;
  products.dimensions.heigth = req.body.dimensions.heigth;
  products.dimensions.width = req.body.dimensions.width;
  products.promotional = req.body.promotional;
  products.sizeDiscount = req.body.sizeDiscount;
  products.line = req.body.line;

  products.save()
    .then(savedproducts => res.json(savedproducts))
    .catch(e => next(e));
}

/**
 * Get products list.
 * @property {number} req.query.skip - Number of productss to be skipped.
 * @property {number} req.query.limit - Limit number of productss to be returned.
 * @returns {Products[]}
 */
function list(req, res, next) {
  let count = 0;
  const {
    limit = 50, skip = 0
  } = req.query;
  Products.list({
      limit,
      skip
    })
    .then(productss => { // Вивід продуктив лише які є в НАЯВНОСТІ
      for (i = 0; i < productss.length; i++) {
        if ((productss[i].availability !== true)) {
          productss[i] = "";
        }
        if ((productss.length - 1) == i) {
          count = -1;
        }
      }
      if (count = -1) {
        return res.json(productss);
      }
    })
    .catch(e => next(e));
}


/**
 * Delete products.
 * @returns {Products}
 */
function remove(req, res, next) {
  const products = req.products;
  products.remove()
    .then(deletedproducts => res.json(deletedproducts))
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
