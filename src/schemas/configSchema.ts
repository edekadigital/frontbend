import * as Joi from 'joi';
import {
  DEFAULT_POLICY_NAME,
  DEFAULT_RETINA_SCALE,
  DEFAULT_USE_RELATIVE_UNIT,
} from '../constants';

export const configSchema = Joi.object({
  policies: Joi.object()
    .pattern(/^/, {
      isOlderPolicy: Joi.boolean(),
      variables: Joi.array().items(Joi.object()),
      transformations: Joi.array().items(Joi.object()),
      output: Joi.object().keys({
        perceptualQuality: Joi.string().required(),
      }),
      video: Joi.boolean(),
    })
    .default({}),
  viewports: Joi.object()
    .pattern(/^/, {
      breakpoint: Joi.number()
        .integer()
        .min(0)
        .required(),
      width: Joi.number()
        .integer()
        .positive()
        .required(),
      fallback: Joi.boolean().default(false),
    })
    .required()
    .min(1),
  imageTypes: Joi.object()
    .pattern(/^/, {
      url: Joi.string().required(),
      selector: Joi.string().required(),
      policy: Joi.string().default(DEFAULT_POLICY_NAME),
      overrides: Joi.object()
        .pattern(/^/, [
          Joi.object().keys({
            policy: Joi.string().required(),
          }),
        ])
        .optional(),
      credentials: Joi.object()
        .keys({
          username: Joi.string().required(),
          password: Joi.string().required(),
        })
        .optional(),
      useRelativeUnit: Joi.boolean().default(DEFAULT_USE_RELATIVE_UNIT),
      retinaScale: Joi.number()
        .positive()
        .default(DEFAULT_RETINA_SCALE),
    })
    .required()
    .min(1),
});
