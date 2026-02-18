import { Controller, Get, Patch, Post, Body, Req, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('/profile')
@UseGuards(JwtAuthGuard)// Protect all routes with JWT
export class ProfileController {
  constructor(private readonly profileService: ProfileService, private readonly cloudinary: CloudinaryService) {}

  // GET /profile → returns the logged-in user's profile
  @Get()
  async getProfile(@Req() req) {
    console.log(req);
    return this.profileService.getProfile(req.user.email);
  }

  // PATCH /profile → update profile info (name, phone, university, etc.)
  @Patch()
  async updateProfile(@Req() req, @Body() dto: any) {
    console.log('Received profile update request for:', req.user.email, 'with data:', req.body);
    return this.profileService.updateProfile(req.user.email, dto);
  }

  // PATCH /profile/password → change user password
  @Patch('password')
  async changePassword(
    @Req() req,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    console.log('Received password change request for:', req.user.email , 'with body:', body);
    const { oldPassword, newPassword } = body;
    return this.profileService.changePassword(
      req.user.email,
      oldPassword,
      newPassword,
    );
  }

  // POST /profile/image → upload profile picture
  
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    console.log('step1')
    return this.profileService.uploadProfileImage(req.user.email, file);
  }
}

