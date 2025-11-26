'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import { getEventById, registerForEvent } from '@/lib/firebase/events';
import { Event } from '@/lib/types/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Separator } from '@/components/ui/separator';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(params.id);
        if (!eventData) {
          setError('Event not found');
        }
        setEvent(eventData);
      } catch (err: any) {
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleRegister = async () => {
    if (!user || !userProfile) {
      router.push('/login/participant');
      return;
    }

    if (userProfile.role !== 'participant') {
      setError('Only participants can register for events');
      return;
    }

    if (!event) return;

    if (event.registeredCount >= event.capacity) {
      setError('Event is at full capacity');
      return;
    }

    setRegistering(true);
    setError('');

    try {
      await registerForEvent(
        event.id,
        event.title,
        userProfile.uid,
        userProfile.displayName || 'Unknown',
        userProfile.email
      );
      setSuccess('Successfully registered for the event!');
      setEvent({ ...event, registeredCount: event.registeredCount + 1 });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32" />
            <Skeleton className="h-64" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <Button onClick={() => router.push('/events')}>
                Back to Events
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) return null;

  const spotsRemaining = event.capacity - event.registeredCount;
  const isFullyBooked = spotsRemaining <= 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="capitalize">
                {event.type}
              </Badge>
              {event.location.type === 'virtual' && (
                <Badge variant="secondary">Online</Badge>
              )}
              {isFullyBooked && (
                <Badge variant="destructive">Fully Booked</Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-muted-foreground">
              Organized by {event.organizationName}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{event.description}</p>
                </CardContent>
              </Card>

              {/* Hackathon Specific */}
              {event.type === 'hackathon' && (
                <>
                  {event.problemStatements && event.problemStatements.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Problem Statements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {event.problemStatements.map((statement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{statement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {event.judgingCriteria && event.judgingCriteria.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Judging Criteria</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {event.judgingCriteria.map((criteria, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {event.prizePool && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Prize Pool</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">
                          {event.prizePool}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {(event.teamSizeMin || event.teamSizeMax) && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Team Size</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          {event.teamSizeMin && event.teamSizeMax
                            ? `${event.teamSizeMin} - ${event.teamSizeMax} members`
                            : event.teamSizeMin
                            ? `Minimum ${event.teamSizeMin} members`
                            : `Maximum ${event.teamSizeMax} members`}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {/* Requirements */}
              {event.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{event.requirements}</p>
                  </CardContent>
                </Card>
              )}

              {/* Agenda */}
              {event.agenda && (
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{event.agenda}</p>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {event.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spots Available</span>
                      <span className="font-semibold">
                        {spotsRemaining} / {event.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ '--progress-width': `${(event.registeredCount / event.capacity) * 100}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>

                  {user && userProfile?.role === 'participant' ? (
                    <Button
                      className="w-full"
                      onClick={handleRegister}
                      disabled={registering || isFullyBooked || !!success}
                    >
                      {registering
                        ? 'Registering...'
                        : success
                        ? 'Registered ✓'
                        : isFullyBooked
                        ? 'Fully Booked'
                        : 'Register Now'}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => router.push('/login/participant')}
                    >
                      Login to Register
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">{formatDate(event.startDate)}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location Type</p>
                    <p className="font-semibold capitalize">{event.location.type}</p>
                  </div>
                  {event.location.type !== 'virtual' && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Venue</p>
                        <p className="font-semibold">
                          {event.location.venue || 'TBA'}
                        </p>
                        {event.location.address && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.location.address}
                          </p>
                        )}
                        {(event.location.city || event.location.country) && (
                          <p className="text-sm text-muted-foreground">
                            {[event.location.city, event.location.country]
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  {event.location.meetingLink && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Meeting Link</p>
                        <a
                          href={event.location.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm break-all"
                        >
                          Join Online
                        </a>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => router.push('/events')}>
              ← Back to Events
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
