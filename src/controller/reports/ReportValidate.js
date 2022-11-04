const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: false, messages: true });

const schema = {
  type: 'object',
  required: [
    'description'
  ],
  properties: {
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
      errorMessage: {
        type: 'model must be a string with max length of 500 characters'
      },
    },
  },
  additionalProperties: false
};

const validateReport = (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    console.log(validate.errors);
    res.status(404).send({ message: validate.errors[0].message });
    return;
  }
  next();
};

module.exports = validateReport;