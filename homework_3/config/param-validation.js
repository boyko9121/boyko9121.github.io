const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  creatRole: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      superAdmin: Joi.boolean().required(),
      permissions: Joi.string()
    }
  },
  updateRole: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      permissions: Joi.string()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  ////
  creatСategories: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      outputOrder: Joi.string().required(),
      photo: Joi.string()
    }
  },
  updateСategories: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      outputOrder: Joi.string().required(),
      photo: Joi.string()
    },
    params: {
      categorieId: Joi.string().hex().required()
    }
  },
  creatProducts: {
    body: {
      name: Joi.string().required(),
      categorie: Joi.string(),
      photo: Joi.string(),
      price: {
        value: Joi.number().required(),
        currency: Joi.string().required()
      },
      availability: Joi.boolean().required(),
      dimensions: {
        length: Joi.number(),
        heigth: Joi.number(),
        width: Joi.number()
      },
      promotional: Joi.boolean(),
      sizeDiscount: Joi.string(),
      line: Joi.number(),
    }
  },
  updateProducts: {
    body: {
      name: Joi.string().required(),
      categorie: Joi.string(),
      photo: Joi.string(),
      price: {
        value: Joi.number().required(),
        currency: Joi.string().required()
      },
      availability: Joi.boolean().required(),
      dimensions: {
        length: Joi.number(),
        heigth: Joi.number(),
        width: Joi.number()
      },
      promotional: Joi.boolean(),
      sizeDiscount: Joi.string(),
      line: Joi.number(),
    },
    params: {
      productsId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
