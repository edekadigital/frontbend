#!/usr/bin/env node

import { isAbsolute, resolve } from 'path';

import chalk from 'chalk';
import { Arguments, Argv, command } from 'yargs';

import { analyze } from './analyze';
import { readJsonFile } from './helpers';
import { writeResult } from './writeResult';

const argv: Arguments<any> = command(
  '$0 <configFile> <outputDir>',
  'Analyze images',
  (yargs: Argv) =>
    yargs
      .positional('configFile', {
        describe: 'Configuration file',
        type: 'string',
      })
      .positional('outputDir', {
        describe: 'Output directory',
        type: 'string',
      })
      .option('clean', { alias: 'c', default: false })
      .option('open', { alias: 'o', default: true })
).help().argv;

async function main() {
  let configFilePath = argv.configFile;
  if (!isAbsolute(configFilePath)) {
    configFilePath = resolve(process.cwd(), configFilePath);
  }

  let outputDir = argv.outputDir;
  if (!isAbsolute(outputDir)) {
    outputDir = resolve(process.cwd(), outputDir);
  }

  try {
    const config = await readJsonFile(configFilePath);

    const result = await analyze(config, { open: argv.open });

    await writeResult(result, outputDir, {
      clean: argv.clean,
    });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(chalk.red(error.toString()));
    process.exit(1);
  }
}

main();
