const User = require('./user.model');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Role = mongoose.model('Role');

/**
 * function sending message
 */
function nodeMailer(email, firstName, lastName, userName, password, mobileNumber, text) {
  if (text == "deleted") {
    var output = `<p> ${firstName} ${lastName}, Ви були видалені із користувачів</p>`
  } else {
    var output = `
    <p> ${firstName} ${lastName}, ${text}</p>
    <h3>Ваші дані</h3>
    <ul>
    <li>Username: ${userName}</li>
    <li>Password: ${password}</li>
    <li>Phone: ${mobileNumber}</li>
    </ul>
    `
  }
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'kartohaman1@gmail.com',
      pass: '123123qweqwe'
    }
  });


  let mailOptions = {
    from: '"API" <kartohaman1@gmail.com>',
    to: email,
    subject: 'Hello',
    text: 'Hello world?',
    html: output
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {
      msg: 'Email has been sent'
    });
  });
}
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findById(id)
    .populate('role')
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })

}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  let nameRole = req.body.nameRole;
  var text = "Ви успішно зареєстровані!";
  Role.findOne({
    name: nameRole
  }, function(err, doc) {
    if (doc !== null) {

      const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        nameRole: req.body.nameRole,
        role: doc._id
      });

      user.save()
        .then(savedUser => {
          res.json(savedUser);
          nodeMailer(req.body.email, req.body.firstName, req.body.lastName, req.body.userName, req.body.password, req.body.mobileNumber, text);
        })
        .catch(e => next(e));

    }
  })
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  let text = "Ваші дані успішно відредаговані!";
  const user = req.user;
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.userName = req.body.userName;
  user.password = req.body.password;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => {
      res.json(savedUser);
      nodeMailer(user.email, user.firstName, user.lastName, user.userName, user.password, user.mobileNumber, text);
    })
    .catch(e => next(e));

}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {

  const {
    limit = 50, skip = 0
  } = req.query;
  User.list({
      limit,
      skip
    })
    .then(users => {
      res.json(users);
      console.log(users);
    })
    .catch(e => next(e));

}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  let text = "deleted";
  console.log(req.user.email);
  console.log(user.email);


  user.remove()
    .then(deletedUser => {
      res.json(deletedUser)
      nodeMailer(deletedUser.email, deletedUser.firstName, deletedUser.lastName, deletedUser.userName, deletedUser.password, deletedUser.mobileNumber, text);
    })
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
