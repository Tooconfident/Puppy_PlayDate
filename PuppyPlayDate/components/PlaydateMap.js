import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const PlaydateMap = ({ playdates, region, onPlaydateMarker }) => {

  const renderMarkers = (playdates) => {
    console.log("Rendering markers", playdates);

    return playdates.map(playdate => (
        <MapView.Marker
          key={playdate.id}
          coordinate={JSON.parse(playdate.location)}
          title="Helloooo"
          description="ASDASDDSADSASDADASDSADSA DSADASDDSA\nASDSDASADDSA"
          image={require('../Resources/dog-marker-green.png')}
        >
          <MapView.Callout>
            {renderCallout(playdate)}
          </MapView.Callout>
        </MapView.Marker>
    ));
  };

  const renderCallout = (playdate) => {
    return (
      <View>
        <TouchableOpacity onPress={() => onPlaydateMarker(playdate)}>
          <Text>{playdate.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      showsUserLocation= {true}
      followsUserLocation= {false}
      showsPointsOfInterest= {false}
      // onPlayDatePress= show event // callback function
      // onPlayDateSelect= go to group page // these two may have to be flipped
      >
      {renderMarkers(playdates)}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
});

export default PlaydateMap;
