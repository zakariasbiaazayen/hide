import { Controller, Get, Patch, Post, Body, Req, UseGuards, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('/admin/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userservice: UsersService, private readonly cloudinaryService: CloudinaryService) {}
  
  @Get()
  async getall(@Req() req) {
    return this.userservice.findAll();
  }

  @Patch("/:id")
  async update(@Param('id') id: string, @Body() body: any) {
    return this.userservice.update(id, body);
  }

  @Patch("/upload/:id")
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return this.userservice.update(id, { imageUrl: result.secure_url });
  }
}

