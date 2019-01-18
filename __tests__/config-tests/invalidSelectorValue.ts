import { IConfigTest } from './types';

export const invalidSelectorValue: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid selector value',
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
            selector: 12,
          },
        },
      },
      expectError: true,
    },
  ],
};
