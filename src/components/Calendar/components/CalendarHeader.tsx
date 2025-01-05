import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Rss } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onNewEvent: () => void;
  calendarUrl: string;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onNewEvent,
  calendarUrl,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href={calendarUrl}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
          title="Subscribe to Calendar"
        >
          <Rss className="w-4 h-4" />
          <span>Subscribe</span>
        </a>
        <button
          onClick={onNewEvent}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>
    </div>
  );
}
