import Joi from 'joi';

export const ID = Joi.string().hex().length(24);
export const Index = Joi.number().min(0);
export const limit = Joi.number().min(0).default(20);
export const offset = Joi.number().min(0).default(0);
