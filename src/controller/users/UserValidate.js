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
      maxLength: 50,
      errorMessage: {
        type: 'name must be a string'
      },
    },
    lastname: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'lastname must be a string'
      },
    },
    phoneNumber: {
      type: 'number',
      minimum: 0,
      errorMessage: {
        type: 'phoneNumber must be a phone number'
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: 'email must have an email format'
      },
    },
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'password must be a string'
      },
    },
    role: {
      enum: ['admin', 'user', 'driver']
    }
  },
  additionalProperties: false
}

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