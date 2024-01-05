import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/profile';
import { Post } from './typeorm/entities/post';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
@Module({
 imports:[
  ConfigModule.forRoot(
    {
      isGlobal:true,
      
    }
  ),
  TypeOrmModule.forRootAsync(
    {
      useFactory: () => ({
        type: 'mysql',
        host:  process.env.host,
        port: parseInt(process.env.port),
        username:  process.env.db_username,
        password: process.env.password,
        database: process.env.database,
        entities: [User,Post,Profile],
        synchronize: false
      })
    }
  )
  ,
  
  AuthModule,UsersModule],
 controllers:[AppController],
 providers:[AppService]
})
export class AppModule {}
