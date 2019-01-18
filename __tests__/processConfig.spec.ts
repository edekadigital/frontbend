import { processConfig } from '../src/processConfig';

import { defaultValues } from './config-tests/defaultValues';
import { fallbackViewportDetection } from './config-tests/fallbackViewportDetection';
import { invalidBreakpointValue } from './config-tests/invalidBreakpointValue';
import { invalidConfig } from './config-tests/invalidConfig';
import { invalidCredentialsObject } from './config-tests/invalidCredentialsObject';
import { invalidRetinaScaleValue } from './config-tests/invalidRetinaScaleValue';
import { invalidSelectorValue } from './config-tests/invalidSelectorValue';
import { invalidUrlValue } from './config-tests/invalidUrlValue';
import { invalidWidthValue } from './config-tests/invalidWidthValue';
import { IConfigTest } from './config-tests/types';
import { viewportSorting } from './config-tests/viewportSorting';

const configTests: IConfigTest[] = [
  invalidConfig,
  defaultValues,
  /**
   * Viewports
   */
  invalidBreakpointValue,
  invalidWidthValue,
  viewportSorting,
  fallbackViewportDetection,
  /**
   * ImageTypes
   */
  invalidUrlValue,
  invalidCredentialsObject,
  invalidSelectorValue,
  invalidRetinaScaleValue,
];

describe('processConfig()', () => {
  test('is a Function', () => {
    expect(processConfig).toBeInstanceOf(Function);
  });

  describe('processes configurations properly', () => {
    for (const tempConfigTest of configTests) {
      test(tempConfigTest.name, () => {
        for (const tempConfigTestCase of tempConfigTest.testCases) {
          if (tempConfigTestCase.expectError) {
            expect(() => {
              processConfig(tempConfigTestCase.data);
            }).toThrowError();
          } else {
            const result = processConfig(tempConfigTestCase.data);
            expect(result).toEqual(tempConfigTestCase.expectResult);
          }
        }
      });
    }
  });
});
