import { IConfigTest } from './types';

export const invalidCredentialsObject: IConfigTest = {
  name:
    'throws an error when a viewport configuration contains an invalid credetials object',
  testCases: [
    // missing password
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
            credentials: {
              username: 'aa',
            },
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
    // missing username
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
            credentials: {
              password: 'aa',
            },
            selector: 'img',
          },
        },
      },
      expectError: true,
    },
  ],
};
