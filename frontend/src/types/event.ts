export type EventType = 'competition' | 'learning' | 'hackathon' | 'camp' | 'workshop' | 'seminar';

export type FieldType = 'text' | 'number' | 'email' | 'select';

export interface RegistrationField {
  id: string;
  title: string;
  type: FieldType;
  options?: string[];
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  age: string;
  price: number;
  driveLink: string;
}

export interface InfoBlock {
  id: string;
  title: string;
  bulletPoints: string[];
}

export interface Event {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  time: string;
  type: EventType;
  themes: Theme[];
  registrationFields: RegistrationField[];
  infoBlocks: InfoBlock[];
}

export type ViewMode = 'list' | 'details' | 'edit' | 'create';
