'use client';

import styles from './WeekView.module.css';

interface WeekViewProps {
  onEventClick?: () => void;
}

// Week View 이벤트 데이터
const weekEvents = [
  {
    day: 4, // Thursday (12)
    time: '2:00 PM',
    title: 'Coding Workshop',
    club: 'CS Society',
    color: '#615fff',
    startHour: 14,
    duration: 2
  },
  {
    day: 5, // Friday (13)
    time: '3:00 PM',
    title: 'Practice Session',
    club: 'Soccer Team',
    color: '#00c950',
    startHour: 15,
    duration: 2
  },
  {
    day: 5, // Friday (13)
    time: '4:00 PM',
    title: 'Weekly Meeting',
    club: 'Robotics Club',
    color: '#2b7fff',
    startHour: 16,
    duration: 1
  },
  {
    day: 6, // Saturday (14)
    time: '5:30 PM',
    title: 'Auditions',
    club: 'Drama Society',
    color: '#ad46ff',
    startHour: 17.5,
    duration: 2.5
  }
];

const weekDays = [
  { name: 'SUN', date: '8' },
  { name: 'MON', date: '9' },
  { name: 'TUE', date: '10' },
  { name: 'WED', date: '11' },
  { name: 'THU', date: '12' },
  { name: 'FRI', date: '13', isToday: true },
  { name: 'SAT', date: '14' }
];

const hours = [
  '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
  '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
];

export default function WeekView({ onEventClick }: WeekViewProps) {
  return (
    <div className={styles.weekViewWrapper}>
      {/* Calendar Grid */}
      <div className={styles.calendarGrid}>
        {/* Time Column */}
        <div className={styles.timeColumn}>
          <div className={styles.timeHeaderSpacer} />
          {hours.map((hour, index) => (
            <div key={index} className={styles.timeSlot}>
              <span className={styles.timeLabel}>{hour}</span>
            </div>
          ))}
        </div>

        {/* Days Columns */}
        <div className={styles.daysContainer}>
          {/* Days Header */}
          <div className={styles.daysHeader}>
            {weekDays.map((day, index) => (
              <div key={index} className={styles.dayHeader}>
                <span className={styles.dayName}>{day.name}</span>
                {day.isToday ? (
                  <div className={styles.todayCircle}>
                    <span className={styles.todayDate}>{day.date}</span>
                  </div>
                ) : (
                  <span className={styles.dayDate}>{day.date}</span>
                )}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className={styles.daysGrid}>
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className={styles.dayColumn}>
                {hours.map((_, hourIndex) => (
                  <div key={hourIndex} className={styles.daySlot} />
                ))}
                
                {/* Events for this day */}
                {weekEvents
                  .filter(event => event.day === dayIndex)
                  .map((event, eventIndex) => {
                    const topPosition = ((event.startHour - 7) * 64);
                    const height = event.duration * 64;
                    
                    return (
                      <div
                        key={eventIndex}
                        className={styles.eventCard}
                        style={{
                          backgroundColor: event.color,
                          top: `${topPosition}px`,
                          height: `${height}px`
                        }}
                        onClick={onEventClick}
                      >
                        <h4 className={styles.eventTitle}>{event.title}</h4>
                        <p className={styles.eventTime}>{event.time}</p>
                        <p className={styles.eventClub}>{event.club}</p>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

