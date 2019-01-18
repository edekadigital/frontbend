import { readFileSync } from 'fs';
import { createServer, Server } from 'http';

const DEFAULT_PORT = 8000;

function closeServer(server: Server): Promise<any> {
  return new Promise(resolve => {
    server.close(() => resolve());
  });
}

export function serveExamplePage(
  pageFile: string,
  port: number = DEFAULT_PORT
): Promise<() => Promise<any>> {
  return new Promise(resolve => {
    const page = readFileSync(pageFile);
    const server = createServer((_, response) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(page);
      response.end();
    }).listen(port, () => {
      resolve(() => closeServer(server));
    });
  });
}
