const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * categorie Schema
 */
const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  outputOrder: {
    type: String
  },
  photo: {
    type: String
  },
  versionKey: false
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
CategoriesSchema.method({});

/**
 * Statics
 */
CategoriesSchema.statics = {
  /**
   * Get Role
   * @param {ObjectId} id - The objectId of Role.
   * @returns {Promise<Role, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((categorie) => {
        if (categorie) {
          return categorie;
        }
        const err = new APIError('No such categorie exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List categories in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of categories to be skipped.
   * @param {number} limit - Limit number of categories to be returned.
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
module.exports = mongoose.model('Categories', CategoriesSchema);
