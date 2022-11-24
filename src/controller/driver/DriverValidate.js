const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: false, messages: true });

const schema = {
  type: 'object',
  required: [
    'license',
    'model',
    'licensePlate'
  ],
  properties: {
    license: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'license must be a string'
      },
    },
    model: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'model must be a string'
      },
    },
    licensePlate: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'licensePlate must be a string'
      },
    }
  },
  additionalProperties: false
};

const validateDriver = (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).send({ message: validate.errors[0].message });
    return;
  }

  next();
};

module.exports = validateDriver;