export interface Course {
  id: string;
  name: string;
  code: string;
  section: string;
  professor: string;
  professorEmail: string;
  room: string;
  schedule: string;
  credits: number;
  theme: string;
  headerColor: string;
  accentColor: string;
  isIrregular?: boolean;
  sectionNote?: string;
  bannerImage?: string;
  grade?: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  isImportant?: boolean;
  attachmentsCount?: number;
  commentsCount?: number;
}

export interface Material {
  id: string;
  courseId: string;
  name: string;
  type: 'ppt' | 'video' | 'pdf' | 'doc' | 'archive';
  category: 'PowerPoint Presentations' | 'Lecture Materials' | 'References' | 'Other learning resources';
  date: string;
  description: string;
  fileSize: string;
  url?: string;
}

export interface Activity {
  id: string;
  courseId: string;
  title: string;
  category: 'Activities' | 'Projects' | 'Quizzes';
  description: string;
  dueDate: string;
  dueTime?: string;
  points: number;
  status: 'Not Started' | 'In Progress' | 'Submitted';
  submittedAt?: string;
}

export interface EnrolledProgram {
  programName: string;
  degree: string;
  department: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  section: string;
  academicYear: string;
  semester: string;
  totalCredits: number;
  currentGpa: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  type: 'lecture' | 'deadline' | 'quiz' | 'exam';
  day: string; // 'Monday', 'Tuesday', etc.
  dateStr: string; // 'Oct 14'
  time: string;
  color: string;
}
