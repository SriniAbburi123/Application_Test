export interface LoggerConfig {
  level: string;
  environment: string;
}

export interface RequestLog {
  traceId: string;
  method: string;
  url: string;
  duration: number;
  statusCode: number;
  body?: any;
  query?: any;
  params?: any;
  headers?: any;
  timestamp: string;
  path: string;
}
