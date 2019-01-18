import * as mkdirp from 'mkdirp';

export function makeDir(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(dir, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
