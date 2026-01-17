'use client';

import { useState } from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

export default function DatePicker({ selectedDate, onDateSelect, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // February 2026
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${dayStr}/${month}/${year}`;
    onDateSelect(dateStr);
    onClose();
  };
  
  const days = getDaysInMonth(currentMonth);
  const today = 15; // For demo purposes
  const selected = 11; // For demo purposes
  
  return (
    <div className={styles.datePicker}>
      {/* Month Header */}
      <div className={styles.monthHeader}>
        <div className={styles.monthTitle}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <div className={styles.monthNavigation}>
          <button className={styles.navButton} onClick={handlePrevMonth} type="button">
            ‹
          </button>
          <button className={styles.navButton} onClick={handleNextMonth} type="button">
            ›
          </button>
        </div>
      </div>
      
      {/* Weekdays */}
      <div className={styles.weekdays}>
        {weekDays.map((day, index) => (
          <div key={index} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className={styles.calendar}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${
              day === null ? styles.emptyDay : ''
            } ${day === selected ? styles.selectedDay : ''} ${
              day === today ? styles.todayDay : ''
            }`}
            onClick={() => day && handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

