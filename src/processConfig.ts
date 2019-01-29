import { orderBy } from 'lodash';

import { configSchema } from './schemas';
import { IConfig, IImageType, IViewport } from './types';

function validate(config: any): IConfig {
  const result = configSchema.validate(config);
  if (result.error) {
    throw result.error;
  }
  return result.value;
}

export function processConfig(
  config: IConfig
): { policies: {}; viewports: IViewport[]; imageTypes: IImageType[] } {
  const validatedConfig: IConfig = validate(config);

  const policies = validatedConfig.policies;

  const viewports = orderBy(
    Object.keys(validatedConfig.viewports).map((id: string) => ({
      ...validatedConfig.viewports[id],
      id,
    })),
    ['breakpoint'],
    ['desc']
  );

  const [fallbackViewport] = [...viewports]
    .reverse()
    .filter(
      (viewport, index) => viewport.fallback || index === viewports.length - 1
    );

  const imageTypes = Object.keys(validatedConfig.imageTypes).map(
    (id: string) => ({
      ...validatedConfig.imageTypes[id],
      id,
    })
  );

  return {
    policies,
    imageTypes,
    viewports: viewports.map(viewport => ({
      ...viewport,
      fallback: viewport === fallbackViewport,
    })),
  };
}
