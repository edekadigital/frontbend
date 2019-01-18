import { IConfigTest } from './types';

export const invalidUrlValue: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid url value',
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
            width: 375,
          },
        },
        imageTypes: {
          'image-type-a': {
            url: 12,
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
  ],
};
