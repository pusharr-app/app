import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useEvents } from '../hooks/useEvents';
import { Sonarr } from './SonarrRow';

export function Events() {
  const { events, loading, getEvents } = useEvents();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getEvents} />
      }
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {events.map((event) => {
        if (event.__source === 'sonarr') {
          return <Sonarr key={event.__createdAt} event={event} />;
        }
        return null;
      })}
    </ScrollView>
  );
}
