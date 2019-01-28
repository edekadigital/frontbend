import { IConfigTest } from './types';

export const defaultValues: IConfigTest = {
  name: 'sets default values properly',
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
          },
        },
      },
      expectResult: {
        policies: {},
        viewports: [
          {
            id: 'xs',
            breakpoint: 0,
            width: 375,
            fallback: true,
          },
        ],
        imageTypes: [
          {
            policy: 'default',
            useRelativeUnit: true,
            retinaScale: 1.5,
            id: 'image-type-a',
            url: 'http://www...',
            selector: 'img',
          },
        ],
      },
    },
  ],
};
