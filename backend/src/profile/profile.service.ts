import { Injectable, NotFoundException, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import * as argon2 from 'argon2';
import { CloudinaryService } from '../cloudinary/cloudinary.service';


@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument> , private cloudinary: CloudinaryService,) {}
  async getProfile(email: string) {
    const user = await this.userModel.findOne({ email }).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(email: string, dto: any) {
    console.log('Updating profile for:', email, 'with data:', dto);
    const user = await this.userModel.findOneAndUpdate({ email }, dto, { new: true }).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async changePassword(email: string, currentPassword: string, newPassword: string) {
    console.log('Changing password for:', email, 'Current Password:', currentPassword, 'New Password:', newPassword);
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await argon2.verify(user.password, currentPassword);
    if (!isMatch) throw new Error('Current password is incorrect');

    user.password = await argon2.hash(newPassword);
    await user.save();

    return { message: 'Password changed successfully' };
  }
   async uploadProfileImage(email: string, file: Express.Multer.File) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');
    console.log(user , 'setp2')
    // delete old image if exists
    if (user.imagePublicId) {
      await this.cloudinary.deleteImage(user.imagePublicId);
    }

    // upload new image
    const result = await this.cloudinary.uploadImage(file);

    user.imageUrl = result.secure_url;
    user.imagePublicId = result.public_id;

    await user.save();

    return {
      imageUrl: user.imageUrl,
    };
  }
}
