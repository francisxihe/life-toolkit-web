import React from 'react';
import { X, Clock, Calendar as CalendarIcon, Type } from 'lucide-react';
import { EventFormData } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  mode: 'create' | 'edit';
}

export default function EventModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  mode,
}: EventModalProps) {
  if (!isOpen) return null;

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    if (field === 'startTime' && value >= formData.endTime) {
      // If start time is later than end time, adjust end time
      const [hours, minutes] = value.split(':').map(Number);
      const newEndTime = `${String(hours + 1).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}`;
      setFormData({ ...formData, startTime: value, endTime: newEndTime });
    } else if (field === 'endTime' && value <= formData.startTime) {
      // If end time is earlier than start time, adjust start time
      const [hours, minutes] = value.split(':').map(Number);
      const newStartTime = `${String(Math.max(0, hours - 1)).padStart(
        2,
        '0'
      )}:${String(minutes).padStart(2, '0')}`;
      setFormData({ ...formData, endTime: value, startTime: newStartTime });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'create' ? 'New Event' : 'Edit Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Event Title
              </div>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </div>
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </div>
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </div>
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add event description (optional)"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {Object.keys(colorClasses).map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`
                    w-6 h-6 rounded-full border-2 
                    ${
                      formData.color === color
                        ? 'border-gray-600'
                        : 'border-transparent'
                    }
                    ${colorClasses[color as keyof typeof colorClasses]}
                  `}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {mode === 'create' ? 'Create Event' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
