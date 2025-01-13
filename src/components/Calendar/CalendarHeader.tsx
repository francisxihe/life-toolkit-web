import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Rss } from 'lucide-react';
import { useCalendarContext } from './Context';

export default function CalendarHeader() {
  const {
    currentDate,
    onPrevMonth,
    onNextMonth,
    getCalendarUrl,
    setModalMode,
    setIsModalOpen,
  } = useCalendarContext();

  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {currentDate ? format(currentDate, 'MMMM yyyy') : 'Loading...'}
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
          href={getCalendarUrl?.()}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
          title="Subscribe to Calendar"
        >
          <Rss className="w-4 h-4" />
          <span>Subscribe</span>
        </a>
        <button
          onClick={() => {
            setModalMode('create');
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>
    </div>
  );
}
