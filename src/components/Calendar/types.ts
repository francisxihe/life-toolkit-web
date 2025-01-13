export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  description?: string;
}

export interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  description?: string;
}
