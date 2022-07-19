import Joi from 'joi';

export const ID = Joi.string().hex().length(24);
export const Index = Joi.number().min(0);
