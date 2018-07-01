const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Categories = mongoose.model('Categories');
/**
 * products Schema
 */

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  photo: {
    type: String,
  },
  price: {
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      match: [/^[A-Z]{3}$/,
        'Three capital letters'
      ],
      required: true
    }
  },
  availability: {
    type: Boolean,
    required: true
  },
  dimensions: {
    length: {
      type: Number,
      required: true
    },
    heigth: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  promotional: {
    type: Boolean,
    required: true
  },
  sizeDiscount: {
    type: String,
    match: [/^[0-9]{1,3}%$/, "%"],
    required: true
  },
  line: {
    type: Number,
    required: true
  }
});



/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ProductsSchema.method({});

/**
 * Statics
 */
ProductsSchema.statics = {
  /**
   * Get Role
   * @param {ObjectId} id - The objectId of Role.
   * @returns {Promise<Role, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((products) => {
        if (products) {
          return products;
        }
        const err = new APIError('No such products exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List productss in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of productss to be skipped.
   * @param {number} limit - Limit number of productss to be returned.
   * @returns {Promise<Role[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Role
 */
module.exports = mongoose.model('Products', ProductsSchema);
