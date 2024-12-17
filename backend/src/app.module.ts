import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnsembleModule } from './ensemble/ensemble.module';
import { UserDataModule } from './user-data/user-data.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { PostsModule } from './posts/posts.module';

// @Module decorator is used to define metadata for the module
@Module({
  imports: [
    // MongooseModule.forRoot() is used to connect to the MongoDB database
    MongooseModule.forRoot('mongodb://localhost/daos'),
    // module imports that the root module dependens on
    UserModule,
    AuthModule,
    EnsembleModule,
    UserDataModule,
    InstrumentsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
