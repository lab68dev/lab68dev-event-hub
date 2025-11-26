'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import { logout } from '@/lib/firebase/auth';
import { getEventsByOrganization, updateEventStatus } from '@/lib/firebase/events';
import { Event } from '@/lib/types/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function OrganizationDashboardPage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login/organization');
    } else if (!authLoading && userProfile && userProfile.role !== 'organization') {
      router.push(`/dashboard/${userProfile.role === 'admin' ? 'admin' : 'participant'}`);
    }
  }, [user, userProfile, authLoading, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (userProfile?.uid) {
        try {
          const orgEvents = await getEventsByOrganization(userProfile.uid);
          setEvents(orgEvents);
        } catch (err: any) {
          setError(err.message || 'Failed to load events');
        } finally {
          setLoading(false);
        }
      }
    };

    if (userProfile) {
      fetchEvents();
    }
  }, [userProfile]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      router.push('/login/organization');
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  };

  const handlePublish = async (eventId: string) => {
    try {
      await updateEventStatus(eventId, 'published');
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, status: 'published' } : e
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to publish event');
    }
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'published': return 'default';
      case 'ongoing': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Organization Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {userProfile.organizationName || userProfile.displayName}
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => router.push('/dashboard/events/create')}>
                Create Event
              </Button>
              <Button onClick={handleLogout} variant="outline" disabled={loggingOut}>
                {loggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Statistics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Events</CardDescription>
                <CardTitle className="text-3xl">{events.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Published</CardDescription>
                <CardTitle className="text-3xl">
                  {events.filter(e => e.status === 'published').length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Registrations</CardDescription>
                <CardTitle className="text-3xl">
                  {events.reduce((sum, e) => sum + e.registeredCount, 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Drafts</CardDescription>
                <CardTitle className="text-3xl">
                  {events.filter(e => e.status === 'draft').length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Events List */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Events</h2>
              <Button variant="outline" onClick={() => router.push('/dashboard/events/create')}>
                + New Event
              </Button>
            </div>

            {events.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't created any events yet
                  </p>
                  <Button onClick={() => router.push('/dashboard/events/create')}>
                    Create Your First Event
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <Card key={event.id} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start:</span>
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Registrations:</span>
                          <span>{event.registeredCount} / {event.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="capitalize">{event.location.type}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => router.push(`/events/${event.id}`)}
                        >
                          View
                        </Button>
                        {event.status === 'draft' && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handlePublish(event.id)}
                          >
                            Publish
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
