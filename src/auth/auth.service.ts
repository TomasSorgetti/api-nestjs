import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/users_schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;

    const findUser = await this.userModel.findOne({ email });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new HttpException('Wrong password', 401);
    }
    const payload = { username: findUser.username, email: findUser.email, sub: findUser._id };
    const token = await this.jwtService.sign(payload)
    return {
      access_token: token,
      user: findUser
    }
  }

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject
    const plainToHash = await bcrypt.hash(password, 10)
    userObject = { ...userObject, password: plainToHash }
    return this.userModel.create(userObject)
  }

}
