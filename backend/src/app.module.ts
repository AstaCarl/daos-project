import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { UserDataModule } from './userData/userData.module';
import { MyInstrumentsModule } from './my_instruments/my_instruments.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { EnsembleModule } from './ensemble/ensemble.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/daos'),
    UserModule,
    AuthModule,
    // UserDataModule,
    MyInstrumentsModule,
    InstrumentsModule,
    EnsembleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
