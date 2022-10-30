const restrictToAdmin = fieldToValidate => (req, res, next) => {
  if (req.query.adminCreation === 'true' && req.query[fieldToValidate] === 'false') {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = restrictToAdmin;