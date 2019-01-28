import { DEFAULT_POLICY_NAME, DEFAULT_RETINA_SCALE } from '../../src/constants';

import { IConfigTest } from './types';

export const fallbackViewportDetection: IConfigTest = {
  name: 'detects fallback viewport properly',
  testCases: [
    // default to largest viewport (breakpoint)
    {
      data: {
        viewports: {
          s: {
            breakpoint: 0,
            width: 768,
          },
          m: {
            breakpoint: 1024,
            width: 1200,
          },
          l: {
            breakpoint: 1440,
            width: 1600,
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
        policies: {},
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
    // take smallest viewport defined as fallback
    {
      data: {
        viewports: {
          s: {
            breakpoint: 0,
            width: 768,
            fallback: true,
          },
          m: {
            breakpoint: 1024,
            width: 1200,
            fallback: true,
          },
          l: {
            breakpoint: 1440,
            width: 1600,
            fallback: true,
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
        policies: {},
        viewports: [
          {
            id: 'l',
            breakpoint: 1440,
            width: 1600,
            fallback: false,
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
            fallback: true,
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
