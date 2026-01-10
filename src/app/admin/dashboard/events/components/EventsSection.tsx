'use client';

import { useState } from 'react';
import styles from './EventsSection.module.css';
import EventCard from './EventCard';
import CreateEventModal, { EventFormData } from './CreateEventModal';
import EditEventModal from './EditEventModal';

const imgIconAdd = "https://www.figma.com/api/mcp/asset/a584c665-496e-46c9-8f42-c0a97ad35bb4";
const imgIconSearch = "https://www.figma.com/api/mcp/asset/4c024de1-3263-4a46-ba23-8c294eadaff0";

interface Event {
  id: string;
  title: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  date: string;
  notificationsSent: number;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEventCreate = (eventData: EventFormData) => {
    // TODO: Implement actual event creation (API call)
    console.log('Creating event:', eventData);
    setIsCreateModalOpen(false);
    // Here you would typically make an API call to create the event
    // and update the events list
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleEventUpdate = (eventData: EventFormData) => {
    // TODO: Implement actual event update (API call)
    console.log('Updating event:', eventData);
    setIsEditModalOpen(false);
    setEditingEvent(null);
    // Here you would typically make an API call to update the event
    // and refresh the events list
  };

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.eventsSection}>
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
        </div>

        <div className={styles.eventsGrid}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onEdit={handleEditEvent} />
          ))}
        </div>
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
    </>
  );
}

