import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { analyze, IConfig, writeResult } from '../src';
import { serveExamplePage } from './helpers';

const examplePageFile = resolve(process.cwd(), 'example', 'page.html');
const exampleConfigFile = resolve(process.cwd(), 'example', 'config.json');
const exampleOutputDir = resolve(process.cwd(), 'example', 'output');

function getExampleConfig(): IConfig {
  return JSON.parse(readFileSync(exampleConfigFile, 'utf8'));
}

let closeServer: () => Promise<any>;

describe('Frontbend', () => {
  beforeAll(async () => {
    closeServer = await serveExamplePage(examplePageFile, 8000);
  });

  afterAll(async () => {
    await closeServer();
  });

  describe('analyze()', () => {
    test('is a Function', () => {
      expect(analyze).toBeInstanceOf(Function);
    });

    test('analyzes example config successfully', async () => {
      expect.assertions(1);
      const exampleResult = await analyze(getExampleConfig());
      expect(exampleResult).toBeInstanceOf(Object);
    }, 25000);

    test('throws an error when an element can not be selected', async () => {
      expect.assertions(1);
      const config = getExampleConfig();
      const [firstImageTypeKey] = Object.keys(config.imageTypes);
      config.imageTypes[firstImageTypeKey].selector = 'some stupid selector';
      try {
        await analyze(config);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    }, 25000);
  });

  describe('writeResult', () => {
    test('is a Function', () => {
      expect(writeResult).toBeInstanceOf(Function);
    });

    test('cleans output directory and writes result to output directy', async () => {
      expect.assertions(3);

      const modifiedImageTypeId = 'modified-image-type-id';
      const modifiedImageTypeOutputFile = resolve(
        exampleOutputDir,
        'image-types',
        `${modifiedImageTypeId}.json`
      );

      const modifiedConfig = getExampleConfig();

      /**
       * analyze modified config and write results
       */
      const [originalImageTypeId] = Object.keys(modifiedConfig.imageTypes);
      modifiedConfig.imageTypes[modifiedImageTypeId] = {
        ...modifiedConfig.imageTypes[originalImageTypeId],
      };
      delete modifiedConfig.imageTypes[originalImageTypeId];
      const modifiedResult = await analyze(modifiedConfig);
      await writeResult(modifiedResult, exampleOutputDir, { clean: true });
      expect(existsSync(modifiedImageTypeOutputFile)).toBe(true);

      const exampleConfig = getExampleConfig();
      const exampleResult = await analyze(exampleConfig);

      /**
       * write results to output directory
       */
      await writeResult(exampleResult, exampleOutputDir);
      expect(existsSync(modifiedImageTypeOutputFile)).toBe(true);

      /**
       * clean output directory and write results
       */
      await writeResult(exampleResult, exampleOutputDir, { clean: true });
      expect(existsSync(modifiedImageTypeOutputFile)).toBe(false);
    }, 25000);
  });
});
