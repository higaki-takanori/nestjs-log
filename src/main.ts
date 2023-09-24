import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/httpException.filter';
import { EmojiLogger } from './logging/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  });
  app.useGlobalFilters(new HttpExceptionFilter(new EmojiLogger()));
  await app.listen(3000);
}
bootstrap();
