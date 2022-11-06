const restrictToAdmin = fieldToValidate => (req, res, next) => {

  if (req.query[fieldToValidate] === 'false' || (req.query.adminCreation === 'true' && req.query.isSuperadmin === 'false')) {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = restrictToAdmin;