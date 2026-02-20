import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      // Load the User schema for MongoDB
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      CloudinaryModule,
      // JWT module (if you need to sign tokens in profile service, e.g., password change)
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<number>('JWT_EXPIRES_IN') || 604800 },
        }),
      }),
    ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // important for AuthModule
})
export class UsersModule {}
