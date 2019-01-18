import { DEFAULT_POLICY_NAME, DEFAULT_RETINA_SCALE } from '../../src/constants';

import { IConfigTest } from './types';

export const viewportSorting: IConfigTest = {
  name: 'sorts viewports descending by breakpoint',
  testCases: [
    {
      data: {
        viewports: {
          s: {
            breakpoint: 0,
            width: 768,
          },
          l: {
            breakpoint: 1440,
            width: 1600,
          },
          m: {
            breakpoint: 1024,
            width: 1200,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
          },
        },
      },
      expectResult: {
        viewports: [
          {
            id: 'l',
            breakpoint: 1440,
            width: 1600,
            fallback: true,
          },
          {
            id: 'm',
            breakpoint: 1024,
            width: 1200,
            fallback: false,
          },
          {
            id: 's',
            breakpoint: 0,
            width: 768,
            fallback: false,
          },
        ],
        imageTypes: [
          {
            id: 'image-type-a',
            url: 'http://www...',
            selector: 'img',
            policy: DEFAULT_POLICY_NAME,
            retinaScale: DEFAULT_RETINA_SCALE,
            useRelativeUnit: true,
          },
        ],
      },
    },
  ],
};
