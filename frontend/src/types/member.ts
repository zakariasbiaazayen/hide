// types/member.ts

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  link?: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  age: number;
  image: string;
  startDate: string;
  endDate?: string;
  achievements: Achievement[];
  projects: Project[];
}