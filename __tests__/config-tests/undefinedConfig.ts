import { IConfigTest } from './types';

export const undefinedConfig: IConfigTest = {
  name: 'throws an error when configuration object is undefined',
  testCases: [
    {
      data: undefined,
      expectError: true,
    },
  ],
};
