export type LessonResourceType = 'sheet' | 'pdf' | 'link' | 'zip';

export interface LessonResource {
  id: string;
  title: string;
  type: LessonResourceType;
  size: string;
  description: string;
}

export interface LessonChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  durationMinutes: number;
  description: string;
  videoPreviewUrl?: string;
  videoThumb: string;
  takeaways: string[];
  resources: LessonResource[];
  checklist: LessonChecklistItem[];
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Module {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  badge?: string;
  iconType: 'rocket' | 'door' | 'cart' | 'marketplaces' | 'tool' | 'algorithm' | 'bulb';
  lessons: Lesson[];
}

export interface StudentNote {
  id: string;
  lessonId: string;
  timestampSec: number;
  timestampFormatted: string;
  content: string;
  createdAt: string;
}

export interface StudentDoubtReply {
  id: string;
  userName: string;
  userAvatar: string;
  isInstructor: boolean;
  text: string;
  createdAt: string;
}

export interface StudentDoubt {
  id: string;
  lessonId: string;
  userName: string;
  userAvatar: string;
  isInstructor: boolean;
  question: string;
  createdAt: string;
  likes: number;
  replies: StudentDoubtReply[];
}

export interface CategoryFee {
  id: string;
  name: string;
  classicRate: number; // e.g. 12.5%
  premiumRate: number; // e.g. 17.5%
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Live' | 'Atualização' | 'Material' | 'Comunidade';
  date: string;
  content: string;
  actionText?: string;
  actionLink?: string;
  highlight?: boolean;
}
