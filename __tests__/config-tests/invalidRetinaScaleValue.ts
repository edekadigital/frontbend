import { IConfigTest } from './types';

export const invalidRetinaScaleValue: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid retinaScale value',
  testCases: [
    {
      data: {
        viewports: {
          xs: {
            breakpoint: 0,
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
            retinaScale: 0,
          },
        },
      },
      expectError: true,
    },
    {
      data: {
        viewports: {
          xs: {
            breakpoint: 0,
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
            retinaScale: -12,
          },
        },
      },
      expectError: true,
    },
  ],
};
