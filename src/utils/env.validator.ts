import { Logger } from '@nestjs/common';

/*
const requiredEnvVars = [
    'LOG_FILE_PATH',
    'LOG_FILE_ROTATE_FREQUENCY',
    'LOG_FILE_MAX_SIZE',
    'LOG_FILE_MAX_TIME',
    'PORT',
    'SECRET_KEY',
    'MONGO_PATH',
    'EXPIRY_DAYS',
    'INSTALLMENT_REMINDER_CRON_EXPRESSION',
    'EMAIL_USERID',
    'EMAIL_PWD',
    'USER_MANAGEMENT_API_URL',
    'INTERNAL_API_SECRET',
    'TEMPLATE_PATH',
    'JWT_SECRET',
    'JWT_EXPIRE',
    'ADMIN_URL',
    'MESSAGE_TYPE',
    'URL',
    'CONCURRENCY_LIMIT',
    'NODE_ENV',
    'DB_HOST',
    'DB_USER',
    'DB_PASS'
]
*/
const requiredEnvVars = [
  'PORT',
  'JWT_SECRET',
  'NODE_ENV',
  'DB_HOST',
  'DB_USER',
  'DB_PASS',
];

export function validateEnvVariables(): void {
  const logger = new Logger('EnvValidator');
  logger.debug('validateEnvVariables: Validating environment variables...');
  logger.debug('validateEnvVariables: requiredEnvVars\n', requiredEnvVars);
  // Define all required environment variables

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    logger.error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    );
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    );
  }

  logger.log('All required environment variables are present');
}
