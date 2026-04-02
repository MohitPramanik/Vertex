import Joi from 'joi';


export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  agreeTerms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the terms and conditions.'
  })
});

