export type EventType = 'conference' | 'workshop' | 'hackathon' | 'meetup';
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
export type LocationType = 'physical' | 'virtual' | 'hybrid';
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled' | 'attended';

export interface EventLocation {
  type: LocationType;
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  meetingLink?: string;
}

export interface Event {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  location: EventLocation;
  capacity: number;
  registeredCount: number;
  bannerImage?: string;
  tags: string[];
  isPublic: boolean;
  // Hackathon specific
  problemStatements?: string[];
  judgingCriteria?: string[];
  prizePool?: string;
  teamSizeMin?: number;
  teamSizeMax?: number;
  // Additional fields
  requirements?: string;
  agenda?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  ticketType?: string;
  status: RegistrationStatus;
  registeredAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
  // Hackathon specific
  teamId?: string;
  teamName?: string;
}

export interface Team {
  id: string;
  eventId: string;
  name: string;
  leaderId: string;
  leaderName: string;
  members: TeamMember[];
  skills: string[];
  projectName?: string;
  projectDescription?: string;
  submissionUrl?: string;
  submittedAt?: Date;
  score?: number;
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  joinedAt: Date;
}

// Form data types for creating/editing
export interface EventFormData {
  title: string;
  description: string;
  type: EventType;
  startDate: string; // ISO string for form handling
  endDate: string;
  locationType: LocationType;
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  meetingLink?: string;
  capacity: number;
  tags: string;
  isPublic: boolean;
  requirements?: string;
  agenda?: string;
  // Hackathon specific
  problemStatements?: string;
  judgingCriteria?: string;
  prizePool?: string;
  teamSizeMin?: number;
  teamSizeMax?: number;
}
