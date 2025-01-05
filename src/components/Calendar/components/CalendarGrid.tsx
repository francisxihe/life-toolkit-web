import React, { useState } from 'react';
import { format, isToday, isSameMonth } from 'date-fns';
import { Event } from '../types';
import EventPopover from './EventPopover';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  events: Event[];
  onEditEvent: (event: Event) => void;
  onQuickAdd: (date: Date) => void;
  onExportEvent: (event: Event) => void;
}

export default function CalendarGrid({
  days,
  currentDate,
  events,
  onEditEvent,
  onQuickAdd,
  onExportEvent,
}: CalendarGridProps) {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => event.date === format(date, 'yyyy-MM-dd'));
  };

  const handleEventHover = (event: Event, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setHoveredEvent(event);
  };

  return (
    <>
      <div className="grid grid-cols-7 text-sm leading-6 text-center text-gray-500 bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2 border-b border-gray-100">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            onClick={() => onQuickAdd(day)}
            className={`
              min-h-[8rem] p-2 border border-gray-100 relative
              ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : 'bg-white'}
              ${dayIdx === 0 ? 'col-start-' + (day.getDay() + 1) : ''}
              hover:bg-gray-50 cursor-pointer
            `}
          >
            <button
              className={`
                w-8 h-8 flex items-center justify-center rounded-full mx-auto
                ${isToday(day) ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}
              `}
            >
              {format(day, 'd')}
            </button>
            <div className="mt-2 space-y-1">
              {getEventsForDay(day).map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEvent(event);
                  }}
                  onMouseEnter={(e) => handleEventHover(event, e)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className={`
                    ${colorClasses[event.color as keyof typeof colorClasses]}
                    text-xs p-1 rounded truncate cursor-pointer hover:opacity-80
                  `}
                >
                  {event.startTime} - {event.endTime} {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {hoveredEvent && (
        <div
          style={{
            position: 'absolute',
            left: `${popoverPosition.x}px`,
            top: `${popoverPosition.y}px`,
          }}
        >
          <EventPopover
            event={hoveredEvent}
            onEdit={onEditEvent}
            onExport={onExportEvent}
          />
        </div>
      )}
    </>
  );
}
