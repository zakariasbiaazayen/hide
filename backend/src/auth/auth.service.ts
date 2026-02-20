import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from '../users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  // 1. Check if user already exists
    const user = await this.userModel.findOne({ email: dto.email });
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    // 2. Hash the password before saving
    const hashedPassword = await argon2.hash(dto.password);

    // 3. Create new user
    const nuser = await this.userModel.create({ ...dto, password: hashedPassword });

    // 4. Return JWT
    return this.generateToken(nuser);
  }



  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await argon2.verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user: UserDocument) {
    const payload = {
      name : user.name,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

}
