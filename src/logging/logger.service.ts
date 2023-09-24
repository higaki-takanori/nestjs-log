import { LoggerService } from '@nestjs/common';
import winston, { createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class EmojiLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const DailyRotateFile = require('winston-daily-rotate-file');
    // infoログ（通常ログ）の出力先を定義
    const applicationLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'application-%DATE%.log',
      dirname: 'logs/application',
      datePattern: 'YYYYMMDD',
      maxFiles: '7d',
    });

    // errorログの出力先を定義
    const errorLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      dirname: 'logs/error',
      datePattern: 'YYYYMMDD',
      maxFiles: '7d',
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // errorログではstackを表示
        format.splat(),
        format.json(),
      ),
      defaultMeta: { service: 'logging', funcName: '' }, // デフォルトの出力項目を指定
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: 'debug-%DATE%.log',
          dirname: 'logs/debug',
          datePattern: 'YYYYMMDD',
          maxFiles: '2d',
        }),
        new DailyRotateFile({
          level: 'error',
          filename: 'error-%DATE%.log',
          dirname: 'logs/error',
          datePattern: 'YYYYMMDD',
          maxFiles: '7d',
        }),
      ],
    });
  }

  private writeToFile(level: string, message: string) {
    this.logger.log(level, message);
    // Implement the logic to write logs to a file here.
    console.log(message); // For demonstration purposes, we'll just log to the console.
  }

  log(message: string) {
    this.writeToFile('log', '📢 ' + message);
  }

  error(message: string, trace: string) {
    this.writeToFile('error', '❌ ' + message);
    this.writeToFile('error', '🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    this.writeToFile('warn', '⚠️ ' + message);
  }

  debug(message: string) {
    this.writeToFile('debug', '🐞 ' + message);
  }
}
