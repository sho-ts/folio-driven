import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.CLIENT_WEB_URL],
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
