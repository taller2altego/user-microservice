const restrictToAdmin = require('./restrictToAdmin');

module.exports = fieldId => (req, res, next) => {
  if (req.query.id != req.params[fieldId]) {
    return restrictToAdmin('isAdmin')(req, res, next);
  }
  next();
};
