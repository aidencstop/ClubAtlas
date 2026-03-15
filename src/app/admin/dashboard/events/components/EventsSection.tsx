'use client';

import { useState, useEffect } from 'react';
import styles from './EventsSection.module.css';
import EventCard from './EventCard';
import CreateEventModal, { EventFormData } from './CreateEventModal';
import EditEventModal from './EditEventModal';
import EventDetailsModal from './EventDetailsModal';
import { useAuth } from '@/contexts/AuthContext';
import { getEvents, createEvent, updateEvent, Event as ApiEvent } from '@/lib/api';

const imgIconAdd = "/images/icons/dashboard/icon-plus.svg";
const imgIconSearch = "/images/icons/dashboard/icon-search.svg";

interface Event {
  id: string;
  title: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  date: string;
  notificationsSent: number;
  attendeesCount: number;
  dateTime?: string;
  location?: string;
  description?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Weekly Meeting',
    status: 'upcoming',
    date: 'Mon, Nov 27, 4:00 PM',
    dateTime: '2024-11-27T16:00',
    location: 'Engineering 201',
    description: 'Regular weekly team meeting',
    notificationsSent: 32,
  },
  {
    id: '2',
    title: 'Competition Prep Workshop',
    status: 'upcoming',
    date: 'Wed, Nov 29, 5:00 PM',
    dateTime: '2024-11-29T17:00',
    location: 'Lab 305',
    description: 'Prepare for upcoming robotics competition',
    notificationsSent: 18,
  },
  {
    id: '3',
    title: 'Guest Speaker Event',
    status: 'upcoming',
    date: 'Mon, Dec 4, 4:00 PM',
    dateTime: '2024-12-04T16:00',
    location: 'Main Auditorium',
    description: 'Special guest speaker from industry',
    notificationsSent: 45,
  },
];

export default function EventsSection() {
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, [userProfile]);

  const loadEvents = async () => {
    if (!userProfile?.managed_club_ids || userProfile.managed_club_ids.length === 0) {
      setEvents([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const clubId = userProfile.managed_club_ids[0];
      const response = await getEvents({ club_id: clubId, limit: 100 });

      if (response.data) {
        const now = new Date();
        const mappedEvents: Event[] = response.data.events.map((apiEvent: ApiEvent) => {
          const startDate = new Date(apiEvent.start_datetime);
          const isPast = startDate < now;
          const status = apiEvent.status === 'cancelled' ? 'cancelled'
            : isPast ? 'completed'
            : 'upcoming';
          return {
          id: apiEvent.id || '',
          title: apiEvent.title,
          status,
          date: new Date(apiEvent.start_datetime).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          dateTime: new Date(apiEvent.start_datetime).toISOString().slice(0, 16),
          location: apiEvent.location,
          description: apiEvent.description,
          notificationsSent: apiEvent.attendees?.length || 0,
          attendeesCount: apiEvent.attendees?.length || 0,
        };
        });

        setEvents(mappedEvents);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEventCreate = async (eventData: EventFormData) => {
    if (!userProfile?.managed_club_ids || userProfile.managed_club_ids.length === 0) {
      alert('No managed clubs found');
      return;
    }

    try {
      const clubId = userProfile.managed_club_ids[0];
      
      const startDateTime = new Date(eventData.dateTime).toISOString();
      const endDateTime = new Date(new Date(eventData.dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString();

      const response = await createEvent({
        club_id: clubId,
        title: eventData.title,
        description: eventData.description,
        event_type: 'meeting',
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        location: eventData.location,
      });

      if (response.data) {
        setIsCreateModalOpen(false);
        await loadEvents();
      } else {
        alert(response.error || 'Failed to create event');
      }
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Failed to create event');
    }
  };

  const handleViewDetails = (event: Event) => {
    setViewingEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setViewingEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleEventUpdate = async (eventData: EventFormData) => {
    if (!editingEvent) return;

    try {
      const startDateTime = new Date(eventData.dateTime).toISOString();
      const endDateTime = new Date(new Date(eventData.dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString();

      const response = await updateEvent(editingEvent.id, {
        title: eventData.title,
        description: eventData.description,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        location: eventData.location,
      });

      if (response.data) {
        setIsEditModalOpen(false);
        setEditingEvent(null);
        await loadEvents();
      } else {
        alert(response.error || 'Failed to update event');
      }
    } catch (err) {
      console.error('Failed to update event:', err);
      alert('Failed to update event');
    }
  };

  const filteredByTab = events.filter(event => {
    const isUpcoming = event.status === 'upcoming';
    return filterTab === 'upcoming' ? isUpcoming : !isUpcoming;
  });
  const filteredEvents = filteredByTab.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.eventsSection}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <h1 className={styles.title}>Event Management</h1>
            <button onClick={handleCreateEvent} className={styles.createButton}>
              <img src={imgIconAdd} alt="" className={styles.buttonIcon} />
              <span>Create New Event</span>
            </button>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <img src={imgIconSearch} alt="" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterTabs}>
              <button
                type="button"
                className={`${styles.filterTab} ${filterTab === 'upcoming' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`${styles.filterTab} ${filterTab === 'past' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('past')}
              >
                Past
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading events...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery
              ? 'No events found matching your search'
              : filterTab === 'upcoming'
                ? 'No upcoming events. Create your first event!'
                : 'No past events yet.'}
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onEdit={handleEditEvent} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onCreateEvent={handleEventCreate}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onUpdateEvent={handleEventUpdate}
        eventData={editingEvent ? {
          id: editingEvent.id,
          title: editingEvent.title,
          dateTime: editingEvent.dateTime || '',
          location: editingEvent.location || '',
          description: editingEvent.description || '',
        } : null}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        onEdit={handleEditEvent}
        event={viewingEvent}
      />
    </>
  );
}

