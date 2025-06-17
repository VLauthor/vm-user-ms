import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_MS',
        transport: Transport.GRPC,
        options: {
          package: 'database',
          protoPath: join(__dirname, '../proto/database.proto'),
          url: 'db.vlauthors.ru:3030',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
