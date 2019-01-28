import { flatMap, groupBy, sortBy, uniq } from 'lodash';
import { launch } from 'puppeteer';

import { processConfig } from './processConfig';
import { processImageType } from './processImageType';
import {
  IAnalyzeContext,
  IAnalyzeOptions,
  IConfig,
  IImageTypeResult,
  IResult,
} from './types';

const defaultOptions: IAnalyzeOptions = {
  open: false,
};

const defaultPoliciy = {
  isOlderPolicy: false,
  variables: [],
  transformations: [],
  output: {
    perceptualQuality: 'mediumHigh',
  },
  video: false,
};

async function createContext(
  config: IConfig,
  options: IAnalyzeOptions
): Promise<IAnalyzeContext> {
  const { policies, viewports, imageTypes } = processConfig(config);
  const browser = await launch({ headless: !options.open });
  return {
    policies,
    viewports,
    imageTypes,
    browser,
  };
}

export async function analyze(
  config: IConfig,
  options: IAnalyzeOptions = {}
): Promise<IResult> {
  const context = await createContext(config, {
    ...defaultOptions,
    ...options,
  });

  const result: IResult = {
    imageTypes: [],
    policies: [],
  };

  for (const tempImageType of context.imageTypes) {
    const imageTypeResult: IImageTypeResult = await processImageType(
      tempImageType,
      context
    );

    result.imageTypes.push(imageTypeResult);
  }

  const sourcesGroupedByPolicy: { [key: string]: IImageTypeResult[] } = groupBy(
    flatMap(result.imageTypes, 'sources'),
    'policy'
  );

  result.policies = Object.keys(sourcesGroupedByPolicy).map(id => ({
    ...defaultPoliciy,
    ...(context.policies[id] || {}),
    ...{
      id,
      breakpoints: {
        widths: sortBy(uniq(flatMap(sourcesGroupedByPolicy[id], 'widths'))),
      },
    },
  }));

  await context.browser.close();

  return result;
}
