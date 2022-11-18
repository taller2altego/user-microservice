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
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: 'email must have an email format'
      },
    },
    role: {
      enum: ['admin', 'user', 'driver']
    }
  },
  additionalProperties: true
}

const oauthValidate = (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    logger.error(JSON.stringify(validate.errors, undefined, 2));
    res.status(400).send({ message: validate.errors[0].message });
  } else {
    next();
  }
};

module.exports = oauthValidate;