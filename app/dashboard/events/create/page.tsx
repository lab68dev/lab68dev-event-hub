'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/AuthContext';
import { createEvent } from '@/lib/firebase/events';
import { EventFormData, EventType, LocationType } from '@/lib/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function CreateEventPage() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    type: 'conference',
    startDate: '',
    endDate: '',
    locationType: 'physical',
    capacity: 100,
    tags: '',
    isPublic: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const eventId = await createEvent(
        userProfile.uid,
        userProfile.organizationName || userProfile.displayName || 'Unknown',
        formData
      );

      // If publish now, update status to published
      if (publishNow) {
        // Will implement status update in next step
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const isHackathon = formData.type === 'hackathon';

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">
            Fill in the details to create your event
          </p>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    placeholder="100"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="technology, innovation, networking"
                  value={formData.tags}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleSwitchChange('isPublic', checked)}
                  disabled={loading}
                />
                <Label htmlFor="isPublic">Make event public</Label>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
              <CardDescription>When will your event take place?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date & Time *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date & Time *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where will your event be held?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type *</Label>
                <Select
                  value={formData.locationType}
                  onValueChange={(value) => handleSelectChange('locationType', value as LocationType)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <Input
                      id="venue"
                      name="venue"
                      placeholder="Convention Center"
                      value={formData.venue || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="San Francisco"
                        value={formData.city || ''}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="USA"
                        value={formData.country || ''}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </>
              )}

              {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                <div className="space-y-2">
                  <Label htmlFor="meetingLink">Meeting Link</Label>
                  <Input
                    id="meetingLink"
                    name="meetingLink"
                    type="url"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    value={formData.meetingLink || ''}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hackathon Specific Fields */}
          {isHackathon && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Hackathon Details</CardTitle>
                <CardDescription>Additional information for hackathon events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problemStatements">Problem Statements (one per line)</Label>
                  <Textarea
                    id="problemStatements"
                    name="problemStatements"
                    placeholder="Build an AI-powered app&#10;Create a sustainable solution&#10;Develop a mobile game"
                    value={formData.problemStatements || ''}
                    onChange={handleChange}
                    disabled={loading}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="judgingCriteria">Judging Criteria (one per line)</Label>
                  <Textarea
                    id="judgingCriteria"
                    name="judgingCriteria"
                    placeholder="Innovation&#10;Technical Implementation&#10;User Experience&#10;Business Viability"
                    value={formData.judgingCriteria || ''}
                    onChange={handleChange}
                    disabled={loading}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prizePool">Prize Pool</Label>
                  <Input
                    id="prizePool"
                    name="prizePool"
                    placeholder="$10,000 in prizes"
                    value={formData.prizePool || ''}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamSizeMin">Min Team Size</Label>
                    <Input
                      id="teamSizeMin"
                      name="teamSizeMin"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={formData.teamSizeMin || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSizeMax">Max Team Size</Label>
                    <Input
                      id="teamSizeMax"
                      name="teamSizeMax"
                      type="number"
                      min="1"
                      placeholder="5"
                      value={formData.teamSizeMax || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Optional details for participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="What participants need to bring or prepare..."
                  value={formData.requirements || ''}
                  onChange={handleChange}
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda</Label>
                <Textarea
                  id="agenda"
                  name="agenda"
                  placeholder="Event schedule and activities..."
                  value={formData.agenda || ''}
                  onChange={handleChange}
                  disabled={loading}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Save & Publish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
