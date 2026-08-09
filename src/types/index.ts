export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  citations: string;
  venue?: string;
  impactFactor?: number;
  statusTag?: 'Summarized' | 'To Read' | 'Used in Draft' | 'In Progress';
  statusColor?: string;
  notesCount?: number;
  tags?: string[];
  abstract?: string;
  keyFindings?: string[];
  methodology?: string;
  dataset?: string;
  keyGaps?: string;
  results?: string;
  fig1Url?: string;
  fig2Url?: string;
  readProgress?: number; // 0-100
  lastReadDate?: string;
}

export interface ResearchAlert {
  id: string;
  type: 'trending' | 'keyword' | 'author';
  title: string;
  description: string;
  meta: string;
  timeAgo: string;
  badgeColor: string;
  read?: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  itemCount: number;
  folderPath: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citation?: {
    title: string;
    authors: string;
    section: string;
  };
  deepDive?: boolean;
}

export interface UserProfile {
  name: string;
  title: string;
  department: string;
  avatarUrl: string;
  institution: string;
  syncActive: boolean;
  researchInterests: string[];
  alertSettings: {
    id: string;
    label: string;
    sublabel: string;
    enabled: boolean;
  }[];
  preferences: {
    theme: 'System' | 'Light' | 'Dark';
    citationStyle: 'APA 7th' | 'MLA 9th' | 'BibTeX' | 'IEEE' | 'Chicago';
    privacyLevel: string;
  };
}
