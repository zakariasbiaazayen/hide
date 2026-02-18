import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: Number, required: true })
  phoneNumber: number;

  @Prop({ required: true })
  University: string;

  @Prop({ required: true })
  major: string;

  @Prop({ type: Number, default: 0 })
  Experience: number;

  @Prop()
  LinkedIn?: string;

  @Prop({ default: 'none'})
  imageUrl?: string;
  
  @Prop({ default: 'none'})
  imagePublicId?: string;// New field for profile picture URL or base64 string
}

export const UserSchema = SchemaFactory.createForClass(User);
