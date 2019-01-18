import { writeFile } from 'fs';

export function writeJsonFile(data: any, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      { encoding: 'utf8' },
      (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}
