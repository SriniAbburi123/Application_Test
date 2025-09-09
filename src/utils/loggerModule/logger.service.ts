import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// import * as colors from 'colors/safe';
import { v4 as uuidv4 } from 'uuid';
import { RequestLog } from './logger.types';
import { AsyncLocalStorage } from 'async_hooks';
import {
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;
  private context?: string;
  private static traceIdStorage = new AsyncLocalStorage<string>();

  private get traceId(): string | undefined {
    return LoggerService.traceIdStorage.getStore();
  }

  constructor() {
    this.initializeLogger();
  }

  private initializeLogger() {
    const environment = process.env.NODE_ENV || 'development';
    const isProduction = environment === 'production';

    // const formatters = {
    //   level: (label: string) => {
    //     return { level: label };
    //   },
    //   timestamp: () => {
    //     return { timestamp: new Date().toISOString() };
    //   },
    //   context: () => {
    //     return this.context ? { context: this.context } : {};
    //   },
    //   traceId: () => {
    //     return this.traceId ? { traceId: this.traceId } : {};
    //   },
    // };

    const developmentFormat = winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      nestWinstonModuleUtilities.format.nestLike('Nest', {
        colors: true,
        prettyPrint: true,
      }),
      winston.format((info) => {
        info.context = this.context;
        info.traceId = this.traceId;
        return info;
      })(),
      winston.format.printf((props) => {
        const { timestamp, level, message, context, traceId } = props;
        // Different colors for different components
        const timestampFormatted = `\x1b[90m${timestamp}\x1b[0m`; // Gray
        const levelFormatted = this.colorizeLevel(level);
        const contextFormatted = context ? `\x1b[33m[${context}]\x1b[0m` : ''; // Yellow
        const traceFormatted = traceId ? `\x1b[36m[${traceId}]\x1b[0m` : ''; // Cyan
        return `${timestampFormatted} ${levelFormatted} ${contextFormatted} ${traceFormatted} ${message}`;
      }),
    );

    const productionFormat = winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.ms(),
      winston.format((info) => {
        info.context = this.context;
        info.traceId = this.traceId;
        return info;
      })(),
      winston.format.json(),
    );

    
    // Create transports array
    const transports: winston.transport[] = [new winston.transports.Console()];

    // Only add file transport if we can create the log directory
    try {
      const logFilePath = process.env.LOG_FILE_PATH || './logs/nestjs-%DATE%.log';
      const logDir = path.dirname(logFilePath);
      
      // Ensure log directory exists
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      // Test write permissions
      const testFile = path.join(logDir, 'test-write.tmp');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);

      // If we reach here, we have write permissions
      const rotateFileTransport = new winston.transports.DailyRotateFile({
        filename: logFilePath,
        datePattern: process.env.LOG_FILE_ROTATE_FREQUENCY || 'YYYY-MM-DD',
        maxSize: process.env.LOG_FILE_MAX_SIZE || '20m',
        maxFiles: process.env.LOG_FILE_MAX_TIME || '14d',
        zippedArchive: true,
        format: winston.format.json(),
        handleExceptions: false,
        handleRejections: false,
      });

      // Add error handling for the file transport
      rotateFileTransport.on('error', (error) => {
        console.error('Winston file transport error:', error);
      });

      transports.push(rotateFileTransport);
      
    } catch (error) {
      console.warn('Could not initialize file logging, using console only:', error.message);
    }

    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      format: isProduction ? productionFormat : developmentFormat,
      transports,
      exitOnError: false,
    });

    // Add global error handling
    this.logger.on('error', (error) => {
      console.error('Winston logger error:', error);
    });
  }

  private colorizeLevel(level: string): string {
    switch (level) {
      case 'error':
        return `\x1b[31m${level}\x1b[0m`; // Red
      case 'warn':
        return `\x1b[33m${level}\x1b[0m`; // Yellow
      case 'info':
        return `\x1b[32m${level}\x1b[0m`; // Green
      case 'debug':
        return `\x1b[95m${level}\x1b[0m`; // pink
      case 'verbose':
        return `\x1b[35m${level}\x1b[0m`; // Magenta
      default:
        return `\x1b[29m${level}\x1b[0m`; // black gray
    }
  }

  setContext(context: string) {
    this.context = context;
  }

  setTraceId(traceId?: string) {
    const newTraceId = traceId || uuidv4();
    LoggerService.traceIdStorage.enterWith(newTraceId);
  }

  log(message: any, context?: string) {
    if (context) this.setContext(context);
    this.logger.info(message);
  }

  info(message: any, context?: string) {
    if (context) this.setContext(context);
    this.logger.info(message);
  }

  error(message: any, trace?: string, context?: string) {
    if (context) this.setContext(context);
    this.logger.error(message, { trace });
  }

  warn(message: any, context?: string) {
    if (context) this.setContext(context);
    this.logger.warn(message);
  }

  debug(message: any, context?: string) {
    if (context) this.setContext(context);
    this.logger.debug(message);
  }

  verbose(message: any, context?: string) {
    if (context) this.setContext(context);
    this.logger.verbose(message);
  }

  logRequest(requestLog: RequestLog) {
    if (process.env.NODE_ENV === 'development') {
      const { traceId, method, url, duration, statusCode, timestamp, path } = requestLog;
      
    //   ${colors.dim('└──')} Trace ID: ${traceId}
    //   ${colors.dim('└──')} Method: ${colors.bgBlue(method)}
    //   ${colors.dim('└──')} URL: ${colors.blue(url)}
    //   ${colors.dim('└──')} Path: ${path}
    //   ${colors.dim('└──')} Status: ${statusCode}
    //   ${colors.dim('└──')} Duration: ${colors.bgGreen(duration.toString() + 'ms')}`;

      let logMessage = `
    🔍 API Request Details:

        ${('└──')} Trace ID: ${traceId}
        ${('└──')} Method: \x1b[44m${method}\x1b[0m
        ${('└──')} URL: \x1b[34m${url}\x1b[0m
        ${('└──')} Path: ${path}
        ${('└──')} Status: ${statusCode}
        ${('└──')} Duration: \x1b[42m${duration.toString() + 'ms'}\x1b[0m`;

      // if (Object.keys(body || {}).length > 0) {
      //   logMessage += `\n${colors.dim('└──')} Body: ${JSON.stringify(body, null, 2)}`;
      // }

      // if (Object.keys(query || {}).length > 0) {
      //   logMessage += `\n${colors.dim('└──')} Query: ${JSON.stringify(query, null, 2)}`;
      // }

      // if (Object.keys(params || {}).length > 0) {
      //   logMessage += `\n${colors.dim('└──')} Params: ${JSON.stringify(params, null, 2)}`;
      // }

      logMessage += `\n${('└──')}Timestamp: ${timestamp}`;
    //   logMessage += `\n${colors.dim('└──')}Timestamp: ${timestamp}`;

      this.logger.info(logMessage);
    } else {
      this.logger.info('API Request', { ...requestLog });
    }
  }
}