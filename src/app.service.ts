import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('This is a log message.');
    this.logger.debug('Debugging some process...');
    this.logger.warn('Warning: Something seems off!');
    this.logger.error('Oops! An error occurred.');
    throw new Error('test Error');
    return 'Hello World!';
  }
}
