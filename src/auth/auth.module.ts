import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users_schema';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { JwtStragegy } from './jwt.strategy';


 @Module({
   imports: [
     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
     JwtModule.register({
      secret: config.jwtsecret,
      signOptions: { expiresIn: '60s' },
    })
   ],
  controllers: [AuthController],
  providers: [AuthService, JwtStragegy],
})
export class AuthModule {}