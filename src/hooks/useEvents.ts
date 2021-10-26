import { useEffect, useState } from 'react';
import { firebase } from '../firebase';

export function useEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    setLoading(true);
    const token = // @ts-ignore
    firebase.auth().currentUser.toJSON().stsTokenManager.accessToken;

    const res = await fetch('https://www.pusharr.com/api/events', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    setLoading(false);
    setEvents(json.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return { events, loading, getEvents };
}
