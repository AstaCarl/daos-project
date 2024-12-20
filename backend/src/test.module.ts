import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnsembleModule } from './ensemble/ensemble.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/daos-test'),
    UserModule,
    AuthModule,
    EnsembleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TestModule {}
