import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService();
  constructor() {
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = uuidv4();
    this.logger.setTraceId(traceId);

    const startTime = Date.now();

    const { method, originalUrl, body, headers, ip } = req;
    const authToken = req.get('Authorization');
    this.logger.log(
      `Request object: [ Method[${method}] URL[${headers.host}${originalUrl}] JWT[${authToken ? 'found' : 'not found'}] Body[${JSON.stringify(
        body,
      )}] IP[${ip}]]`,
    );

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const requestDetails = {
        traceId,
        method: req.method,
        url: req.originalUrl,
        duration,
        statusCode: res.statusCode,
        body: process.env.NODE_ENV === 'development' ? req.body : undefined,
        query: process.env.NODE_ENV === 'development' ? req.query : undefined,
        params: process.env.NODE_ENV === 'development' ? req.params : undefined,
        headers:
          process.env.NODE_ENV === 'development' ? req.headers : undefined,
        timestamp: new Date().toISOString(),
        path: req.path,
      };

      this.logger.logRequest(requestDetails);
    });

    next();
  }
}
