import React from 'react';
import { CalendarEvent } from './types';
import { Clock, Calendar as CalendarIcon, Edit2, Share } from 'lucide-react';

interface EventPopoverProps {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onExport: (event: CalendarEvent) => void;
}

export default function EventPopover({
  event,
  onEdit,
  onExport,
}: EventPopoverProps) {
  return (
    <div className="absolute z-50 bg-white rounded-lg shadow-xl p-4 w-72 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onExport(event)}
            className="flex items-center gap-1 px-2 py-1 text-sm bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition-colors"
            title="Export to Apple Calendar"
          >
            <Share className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => onEdit(event)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            {event.startTime} - {event.endTime}
          </span>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        )}
      </div>
    </div>
  );
}
