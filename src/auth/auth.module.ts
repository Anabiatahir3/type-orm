import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from "@nestjs/jwt";
import { jwtConstants } from './constants';
import { RolesGuard } from './role.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,RolesGuard],
  imports:[UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),]
})
export class AuthModule {}
