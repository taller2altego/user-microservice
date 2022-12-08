const Ajv = require('ajv');
const logger = require('../../../winston');
const ajv = new Ajv({ allErrors: false, messages: true });
const schema = {
  type: 'object',
  required: [
    'name',
    'lastname',
    'phoneNumber',
    'email',
    'password',
    'role'
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    lastname: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    phoneNumber: {
      type: 'number',
      minimum: 0
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    role: {
      enum: ['admin', 'user', 'driver']
    }
  },
  additionalProperties: false
};

const validateUser = (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    logger.error(JSON.stringify(validate, undefined, 2));
    res.status(400).send({ message: validate.errors[0].message });
    return;
  }

  next();
};

module.exports = validateUser;