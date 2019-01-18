import { resolve } from 'path';

import { cleanDir, makeDir, writeJsonFile } from './helpers';
import { IResult, IWriteOptions } from './types';

const IMAGE_TYPES_DIRECTORY_NAME = 'image-types';
const POLICIES_DIRECTORY_NAME = 'policies';

const defaultOptions: IWriteOptions = {
  clean: false,
};

interface IData {
  id: string;
}

async function writeDataToFile(baseDir: string, items: IData[]) {
  for (const data of items) {
    const outputFile = resolve(baseDir, `${data.id}.json`);
    await writeJsonFile(data, outputFile);
  }
}

export async function writeResult(
  result: IResult,
  outputDir: string,
  options: IWriteOptions = {}
) {
  const { clean } = { ...defaultOptions, ...options };

  if (clean) {
    await cleanDir(outputDir);
  }

  const imageTypesDir = resolve(outputDir, IMAGE_TYPES_DIRECTORY_NAME);
  await makeDir(imageTypesDir);
  await writeDataToFile(imageTypesDir, result.imageTypes);

  const policiesDir = resolve(outputDir, POLICIES_DIRECTORY_NAME);
  await makeDir(policiesDir);
  await writeDataToFile(policiesDir, result.policies);
}
