import {getAllUsers} from "../../../services/admin.services";

export interface user {
  id: string;

  // Basic info
  email: string;
  name: string;
  age: number;
  phone: string;
  signupSince: string;
  imageUrl: string;

  // Details
  university: string;
  major: string;
  roboticsExperience: number;
  linkedin?: string;

  detailsImage?: string;
}

export const mockUsers: user[] = 
  await getAllUsers().then(users => users.map((user: any) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    age: user.dateOfBirth.split("T")[0], // Assuming dateOfBirth is in "YYYY-MM-DD" format
    phone: user.phoneNumber,
    signupSince: user.createdAt.split("T")[0],
    imageUrl: user.imageUrl,
    university: user.University,
    major: user.major,
    roboticsExperience: user.Experience,
    linkedin: user.LinkedIn,
  })))
