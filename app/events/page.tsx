'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPublicEvents } from '@/lib/firebase/events';
import { Event, EventType } from '@/lib/types/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const publicEvents = await getPublicEvents();
        setEvents(publicEvents);
        setFilteredEvents(publicEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === typeFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, typeFilter, events]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
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

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case 'conference': return '🎤';
      case 'workshop': return '🛠️';
      case 'hackathon': return '💻';
      case 'meetup': return '👥';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse upcoming conferences, workshops, hackathons, and meetups. Find the perfect event to expand your knowledge and network.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search events by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <Card className="py-12">
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {events.length === 0
                      ? 'No events available at the moment'
                      : 'No events match your search criteria'}
                  </p>
                  {searchQuery || typeFilter !== 'all' ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setTypeFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map(event => (
                  <Card
                    key={event.id}
                    className="hover:border-primary transition-colors cursor-pointer"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                          <Badge variant="outline" className="capitalize">
                            {event.type}
                          </Badge>
                        </div>
                        {event.location.type === 'virtual' && (
                          <Badge variant="secondary">Online</Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>📅</span>
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>🕒</span>
                          <span>{formatTime(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>📍</span>
                          <span className="line-clamp-1">
                            {event.location.type === 'virtual'
                              ? 'Virtual Event'
                              : event.location.city && event.location.country
                              ? `${event.location.city}, ${event.location.country}`
                              : event.location.venue || 'TBA'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>👥</span>
                          <span>
                            {event.registeredCount} / {event.capacity} registered
                          </span>
                        </div>
                      </div>

                      {event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {event.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{event.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
