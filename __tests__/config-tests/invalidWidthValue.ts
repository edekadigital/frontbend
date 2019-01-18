import { IConfigTest } from './types';

export const invalidWidthValue: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid width value',
  testCases: [
    {
      data: {
        viewports: {
          xs: {
            breakpoint: 0,
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
            breakpoint: 0,
            width: 0,
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
            breakpoint: 0,
            width: 10.5,
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
