import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db } from './config';
import { Event, EventFormData, Registration, Team } from '@/lib/types/event';

/**
 * Create a new event
 */
export const createEvent = async (
  organizationId: string,
  organizationName: string,
  eventData: EventFormData
): Promise<string> => {
  try {
    const eventRef = doc(collection(db, 'events'));
    const eventId = eventRef.id;

    // Parse tags from comma-separated string
    const tagsArray = eventData.tags
      ? eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    // Parse hackathon specific fields
    const problemStatements = eventData.problemStatements
      ? eventData.problemStatements.split('\n').filter(p => p.trim().length > 0)
      : undefined;

    const judgingCriteria = eventData.judgingCriteria
      ? eventData.judgingCriteria.split('\n').filter(c => c.trim().length > 0)
      : undefined;

    const event: Omit<Event, 'id'> = {
      organizationId,
      organizationName,
      title: eventData.title,
      description: eventData.description,
      type: eventData.type,
      status: 'draft',
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      location: {
        type: eventData.locationType,
        venue: eventData.venue,
        address: eventData.address,
        city: eventData.city,
        country: eventData.country,
        meetingLink: eventData.meetingLink,
      },
      capacity: eventData.capacity,
      registeredCount: 0,
      tags: tagsArray,
      isPublic: eventData.isPublic,
      requirements: eventData.requirements,
      agenda: eventData.agenda,
      problemStatements,
      judgingCriteria,
      prizePool: eventData.prizePool,
      teamSizeMin: eventData.teamSizeMin,
      teamSizeMax: eventData.teamSizeMax,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(eventRef, event);
    return eventId;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Get event by ID
 */
export const getEventById = async (eventId: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (eventDoc.exists()) {
      return {
        id: eventDoc.id,
        ...eventDoc.data(),
        startDate: eventDoc.data().startDate.toDate(),
        endDate: eventDoc.data().endDate.toDate(),
        createdAt: eventDoc.data().createdAt.toDate(),
        updatedAt: eventDoc.data().updatedAt.toDate(),
      } as Event;
    }
    return null;
  } catch (error) {
    console.error('Error getting event:', error);
    throw error;
  }
};

/**
 * Get all published public events
 */
export const getPublicEvents = async (): Promise<Event[]> => {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('isPublic', '==', true),
      where('status', '==', 'published'),
      orderBy('startDate', 'desc')
    );

    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Event[];
  } catch (error) {
    console.error('Error getting public events:', error);
    throw error;
  }
};

/**
 * Get events by organization
 */
export const getEventsByOrganization = async (organizationId: string): Promise<Event[]> => {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('organizationId', '==', organizationId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Event[];
  } catch (error) {
    console.error('Error getting organization events:', error);
    throw error;
  }
};

/**
 * Update event
 */
export const updateEvent = async (
  eventId: string,
  updates: Partial<EventFormData>
): Promise<void> => {
  try {
    const updateData: any = {
      ...updates,
      updatedAt: new Date(),
    };

    if (updates.startDate) {
      updateData.startDate = new Date(updates.startDate);
    }
    if (updates.endDate) {
      updateData.endDate = new Date(updates.endDate);
    }
    if (updates.tags) {
      updateData.tags = updates.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    await updateDoc(doc(db, 'events', eventId), updateData);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

/**
 * Update event status
 */
export const updateEventStatus = async (
  eventId: string,
  status: Event['status']
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'events', eventId), {
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating event status:', error);
    throw error;
  }
};

/**
 * Delete event
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

/**
 * Register participant for event
 */
export const registerForEvent = async (
  eventId: string,
  eventTitle: string,
  participantId: string,
  participantName: string,
  participantEmail: string,
  teamId?: string,
  teamName?: string
): Promise<string> => {
  try {
    // Check if already registered
    const existingQuery = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      where('participantId', '==', participantId)
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      throw new Error('Already registered for this event');
    }

    // Create registration
    const registrationRef = doc(collection(db, 'registrations'));
    const registration: Omit<Registration, 'id'> = {
      eventId,
      eventTitle,
      participantId,
      participantName,
      participantEmail,
      status: 'confirmed',
      registeredAt: new Date(),
      checkedIn: false,
      teamId,
      teamName,
    };

    await setDoc(registrationRef, registration);

    // Increment registered count
    await updateDoc(doc(db, 'events', eventId), {
      registeredCount: increment(1),
    });

    return registrationRef.id;
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

/**
 * Get participant registrations
 */
export const getParticipantRegistrations = async (
  participantId: string
): Promise<Registration[]> => {
  try {
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('participantId', '==', participantId),
      orderBy('registeredAt', 'desc')
    );

    const snapshot = await getDocs(registrationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      registeredAt: doc.data().registeredAt.toDate(),
      checkedInAt: doc.data().checkedInAt?.toDate(),
    })) as Registration[];
  } catch (error) {
    console.error('Error getting participant registrations:', error);
    throw error;
  }
};

/**
 * Get event registrations
 */
export const getEventRegistrations = async (eventId: string): Promise<Registration[]> => {
  try {
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      orderBy('registeredAt', 'desc')
    );

    const snapshot = await getDocs(registrationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      registeredAt: doc.data().registeredAt.toDate(),
      checkedInAt: doc.data().checkedInAt?.toDate(),
    })) as Registration[];
  } catch (error) {
    console.error('Error getting event registrations:', error);
    throw error;
  }
};

/**
 * Cancel registration
 */
export const cancelRegistration = async (registrationId: string, eventId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'registrations', registrationId), {
      status: 'cancelled',
    });

    // Decrement registered count
    await updateDoc(doc(db, 'events', eventId), {
      registeredCount: increment(-1),
    });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    throw error;
  }
};
