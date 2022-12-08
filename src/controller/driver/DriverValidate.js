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
      maxLength: 50
    },
    model: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    licensePlate: {
      type: 'string',
      minLength: 1,
      maxLength: 50
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