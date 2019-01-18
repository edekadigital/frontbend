import { readFile } from 'fs';

export function readJsonFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    readFile(filePath, { encoding: 'utf8' }, (error: Error, result: string) => {
      if (error) {
        reject(error);
      } else {
        try {
          const data = JSON.parse(result);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}
