const Joi = require('joi');
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userName: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      nameRole: Joi.string()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userName: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      nameRole: Joi.string()
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
      permissions: Joi.array()
    }
  },
  updateRole: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      superAdmin: Joi.boolean().required(),
      permissions: Joi.array()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  //
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
      categorie: Joi.string().required(),
      photo: Joi.string(),
      price: {
        value: Joi.number().required(),
        currency: Joi.string().required()
      },
      availability: Joi.boolean().required(),
      dimensions: {
        length: Joi.number().required(),
        heigth: Joi.number().required(),
        width: Joi.number().required()
      },
      promotional: Joi.boolean().required(),
      sizeDiscount: Joi.string().required(),
      line: Joi.number().required(),
    }
  },
  updateProducts: {
    body: {
      name: Joi.string().required(),
      price: {
        value: Joi.number().required(),
        currency: Joi.string().required()
      },
      availability: Joi.boolean().required(),
      dimensions: {
        length: Joi.number().required(),
        heigth: Joi.number().required(),
        width: Joi.number().required()
      },
      promotional: Joi.boolean().required(),
      sizeDiscount: Joi.string().required(),
      line: Joi.number().required(),
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
