import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

import * as path from 'path';
import { apiPrefix } from '../../config';
import { Request } from 'express';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => path.resolve(`./dist/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req: Request, res, next) => {
      const { baseUrl } = req;
      if (baseUrl.indexOf(apiPrefix) === 1) {
        next();
      } else if (
        allowedExt.filter(ext => baseUrl.indexOf(ext) > 0).length > 0
      ) {
        res.sendFile(resolvePath(baseUrl));
      } else {
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}
