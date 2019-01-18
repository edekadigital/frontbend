import { IConfigTest } from './types';

export const invalidConfig: IConfigTest = {
  name: 'throws an error when configuration object is invalid',
  testCases: [
    // undefined configuration
    {
      data: undefined,
      expectError: true,
    },
    // empty configuration
    {
      data: {},
      expectError: true,
    },
    // empty viewports object
    {
      data: {
        viewports: {},
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
    // empty imageTypes object
    {
      data: {
        viewports: {
          xs: {
            breakpoint: 0,
            width: 375,
          },
        },
        imageTypes: {},
      },
      expectError: true,
    },
  ],
};
