const Joi = require('@hapi/joi');

const registerValidation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(req);
}


const loginValidation = (req) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(req.body);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;