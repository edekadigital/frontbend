import * as rimraf from 'rimraf';

export function cleanDir(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(dir, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
