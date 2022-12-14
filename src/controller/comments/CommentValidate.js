const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: false, messages: true });

const schema = {
  type: 'object',
  required: [
    'userId',
    'description'
  ],
  properties: {
    userId: {
      type: 'integer'
    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 500
    },
  },
  additionalProperties: false
};

const validateComment = (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    console.log(validate.errors);
    res.status(400).send({ message: validate.errors[0].message });
    return;
  }
  next();
};

module.exports = validateComment;