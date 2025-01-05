import axios from 'axios';
import { Event } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = {
  getEvents: async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  },

  createEvent: async (event: Omit<Event, 'id'>) => {
    const response = await axios.post(`${API_URL}/events`, {
      ...event,
      id: crypto.randomUUID(),
    });
    return response.data;
  },

  updateEvent: async (event: Event) => {
    const response = await axios.put(`${API_URL}/events/${event.id}`, event);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    return response.data;
  },
};
