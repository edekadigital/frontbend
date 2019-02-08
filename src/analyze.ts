import { flatMap, groupBy, sortBy, uniq } from 'lodash';
import { launch } from 'puppeteer';
import * as Listr from 'listr';

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
  parallel: 1,
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
  const parallel = options.parallel || 1;
  return {
    policies,
    viewports,
    imageTypes,
    browser,
    parallel,
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

  const listrTasks: Listr.ListrTask[] = context.imageTypes.map(
    tempImageType => ({
      title: `Analyze image type "${tempImageType.id}"`,
      task: async () => {
        result.imageTypes.push(await processImageType(tempImageType, context));
      },
    })
  );

  await new Listr(listrTasks, {
    concurrent: context.parallel,
  }).run();

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
