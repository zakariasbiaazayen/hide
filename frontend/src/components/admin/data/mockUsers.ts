import user1 from "../../../assets/team1.jpg";
import user2 from "../../../assets/team1.jpg";
import user3 from "../../../assets/team1.jpg";

export interface User {
  id: string;

  // Basic info
  email: string;
  name: string;
  age: number;
  phone: string;
  signupSince: string;
  profileImage: string;

  // Details
  university: string;
  major: string;
  roboticsExperience: number;
  linkedin?: string;
  detailsImage?: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "ahmed@gmail.com",
    name: "Ahmed Smida",
    age: 20,
    phone: "+216...",
    signupSince: "2024-01-01",
    profileImage: user1,   // ← LOCAL IMAGE
    university: "INSAT",
    major: "Computer Engineering",
    roboticsExperience: 3,
  },
  {
    id: "2",
    email: "sara@gmail.com",
    name: "zakaria sbiaa zayen",
    age: 22,
    phone: "+216...",
    signupSince: "2023-10-10",
    profileImage: user2,
    university: "ENIT",
    major: "Mechanical",
    roboticsExperience: 4,
  },
];
