# Lab68 Event Hub - Development Roadmap

## Current Status
✅ Firebase Authentication with role-based access (Admin, Organization, Participant)
✅ Login and Signup pages for all user roles
✅ Basic dashboard structure for participants
✅ User profile management with role-specific fields
✅ Team and skills tracking for hackathon participants

## Immediate Next Steps

### 1. Event Management Core (2-3 weeks)
**Priority: CRITICAL**

#### Database Schema Design
```typescript
// Firestore Collections Structure

// events/{eventId}
interface Event {
  id: string;
  organizationId: string; // Creator
  title: string;
  description: string;
  type: 'conference' | 'workshop' | 'hackathon' | 'meetup';
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    city?: string;
    country?: string;
    meetingLink?: string;
  };
  capacity: number;
  registeredCount: number;
  bannerImage?: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// registrations/{registrationId}
interface Registration {
  id: string;
  eventId: string;
  participantId: string;
  ticketType?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  registeredAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
}
```

#### Implementation Tasks
- [ ] Create Event form component
- [ ] Event listing page (public)
- [ ] Event detail page
- [ ] Event registration flow
- [ ] Organization event management dashboard
- [ ] Event CRUD operations (Create, Read, Update, Delete)
- [ ] Event search and filtering

### 2. Basic Dashboard Enhancement (1 week)
**Priority: HIGH**

#### Organization Dashboard
- [ ] Create event button and flow
- [ ] List of organization's events
- [ ] Event analytics cards (registrations, views)
- [ ] Quick actions menu

#### Admin Dashboard
- [ ] Platform statistics overview
- [ ] Recent events list
- [ ] User management interface
- [ ] Organization approval workflow

#### Participant Dashboard
- [ ] Upcoming events widget
- [ ] Past events with certificates
- [ ] Registration status tracking

### 3. Hackathon Features (2-3 weeks)
**Priority: HIGH**

#### Core Hackathon Features
- [ ] Hackathon event type with specific fields:
  - Problem statements/challenges
  - Judging criteria
  - Prize pool
  - Team size limits
- [ ] Team formation system
- [ ] Project submission interface
- [ ] Submission review dashboard (for organizers)
- [ ] Leaderboard component

### 4. Ticketing System (2 weeks)
**Priority: MEDIUM**

#### Features
- [ ] Ticket type definition (Free, Paid, Multiple tiers)
- [ ] Payment integration (Stripe)
- [ ] QR code generation
- [ ] Digital ticket delivery
- [ ] Ticket validation system
- [ ] Check-in interface

### 5. Schedule Management (1-2 weeks)
**Priority: MEDIUM**

#### Features
- [ ] Session creation interface
- [ ] Schedule builder (drag-and-drop)
- [ ] Multiple tracks/rooms support
- [ ] Schedule calendar view
- [ ] Personal agenda builder for participants

### 6. Speaker Management (1 week)
**Priority: MEDIUM**

#### Features
- [ ] Speaker profile creation
- [ ] Speaker assignment to sessions
- [ ] Speaker directory
- [ ] Speaker detail pages

### 7. Notification System (1 week)
**Priority: HIGH**

#### Features
- [ ] Email service integration (SendGrid/AWS SES)
- [ ] Email templates:
  - Registration confirmation
  - Event reminders
  - Event updates
  - Cancellation notices
- [ ] In-app notification system
- [ ] Notification preferences

### 8. Certificate System (1 week)
**Priority: LOW**

#### Features
- [ ] Certificate template designer
- [ ] Automated certificate generation
- [ ] Certificate verification system
- [ ] PDF download functionality
- [ ] Certificate sharing

## Database Collections Structure

```
users/
  {userId}/
    - uid, email, role, displayName, etc.

events/
  {eventId}/
    - event details
    
registrations/
  {registrationId}/
    - participant event registrations

teams/
  {teamId}/
    - hackathon team data

speakers/
  {speakerId}/
    - speaker profiles

sessions/
  {sessionId}/
    - event sessions/schedule

submissions/
  {submissionId}/
    - hackathon project submissions

certificates/
  {certificateId}/
    - issued certificates

notifications/
  {notificationId}/
    - user notifications
```

## Environment Setup Needed

```env
# Already configured
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# To be added
STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY
SENDGRID_API_KEY
NEXT_PUBLIC_APP_URL
```

## Key Dependencies to Add

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.x",
    "stripe": "^14.x",
    "qrcode": "^1.5.x",
    "date-fns": "^3.x",
    "react-calendar": "^4.x",
    "react-big-calendar": "^1.x",
    "recharts": "^2.x",
    "@sendgrid/mail": "^8.x",
    "react-dropzone": "^14.x",
    "react-markdown": "^9.x"
  }
}
```

## Development Timeline (Estimated)

| Phase | Duration | Features |
|-------|----------|----------|
| **Phase 1** | 2-3 weeks | Event Management Core |
| **Phase 2** | 1 week | Dashboard Enhancements |
| **Phase 3** | 2-3 weeks | Hackathon Features |
| **Phase 4** | 2 weeks | Ticketing & Payments |
| **Phase 5** | 1-2 weeks | Schedule Management |
| **Phase 6** | 1 week | Speaker Management |
| **Phase 7** | 1 week | Notifications |
| **Phase 8** | 1 week | Certificates |
| **Total** | ~12-15 weeks | MVP Complete |

## Success Metrics

- [ ] Organizations can create and manage events
- [ ] Participants can browse and register for events
- [ ] Hackathon registration and team formation works
- [ ] Email notifications are sent reliably
- [ ] Payment processing is secure and functional
- [ ] All three user roles have functional dashboards
- [ ] Mobile responsive across all pages
- [ ] Performance: < 3s page load times
- [ ] Security: All routes properly protected

## Notes
- Start with MVP features (Phase 1-2)
- Gather user feedback early
- Iterate based on actual usage
- Security audits before production launch
- Load testing for scalability
