import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      UserModule,
      {
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../proto/user.proto'),
          url: '0.0.0.0:4040',
        },
      },
    );
    await app.listen();
    console.log('Microservice is listening :)');
  } catch (error) {
    console.error('Error starting microservice:', error);
  }
}
void bootstrap();
