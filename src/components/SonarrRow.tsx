import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Colors,
  BorderRadiuses,
  View,
  Image,
  ListItem,
  Text,
} from 'react-native-ui-lib';

export function Sonarr({ event }) {
  if (event.eventType === 'Rename') return null;
  const ep = event.episodes[0];
  let quality: string;
  if (event.eventType === 'Download') {
    quality = event.episodeFile.quality ?? event.episodes[0].quality ?? '';
  } else {
    quality = event.episodes[0].quality ?? '';
  }
  const seasonEpisode = `S${ep.seasonNumber
    .toString()
    .padStart(2, '0')}E${ep.episodeNumber.toString().padStart(2, '0')} ${
    ep.quality ?? ''
  }`;
  return (
    <View style={{ width: '100%' }}>
      <ListItem
        // @ts-expect-error
        activeBackgroundColor={Colors.grey60}
        activeOpacity={0.3}
        height={77.5}
        onPress={() => Alert.alert(`pressed`)}
      >
        <ListItem.Part left>
          <Image
            source={{
              uri: `https://www.pusharr.com/api/image/${event.__source}/${event.series.tvdbId}`,
            }}
            style={styles.image}
          />
        </ListItem.Part>
        <ListItem.Part
          middle
          column
          containerStyle={[styles.border, { paddingRight: 17 }]}
        >
          <ListItem.Part containerStyle={{ marginBottom: 3 }}>
            <Text
              grey10
              text70
              style={{ flex: 1, marginRight: 10 }}
              numberOfLines={1}
            >
              {event.series.title}
            </Text>
            <Text grey10 text70 style={{ marginTop: 2 }}>
              {seasonEpisode}
            </Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text
              style={{ flex: 1, marginRight: 10 }}
              text90
              grey40
              numberOfLines={1}
            >
              {ep.title}
            </Text>
            <Text text90 color={Colors.green30} numberOfLines={1}>
              {quality}
            </Text>
          </ListItem.Part>
        </ListItem.Part>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey70,
  },
});
