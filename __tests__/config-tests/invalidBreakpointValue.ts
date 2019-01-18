import { IConfigTest } from './types';

export const invalidBreakpointValue: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid breakpoint value',
  testCases: [
    {
      data: {
        viewports: {
          xs: {
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
    {
      data: {
        viewports: {
          xs: {
            breakpoint: -1,
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
    {
      data: {
        viewports: {
          xs: {
            breakpoint: 10.5,
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 'http://www...',
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
  ],
};
