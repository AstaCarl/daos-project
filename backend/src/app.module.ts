import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnsembleModule } from './ensemble/ensemble.module';
import { UserDataModule } from './user-data/user-data.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { MyInstrumentsModule } from './my-instruments/my-instruments.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/daos'),
    UserModule,
    AuthModule,
    EnsembleModule,
    UserDataModule,
    InstrumentsModule,
    MyInstrumentsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
