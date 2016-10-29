import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const DogListItem = ({ item, onPress }) => {
  return (
    <TouchableHighlight onPress={() => onPress(item.id)}>
      <View style={styles.listEntry}>
        <Image style={styles.entryAvatar} source={{ uri: item.avatar }} />

        <View style={styles.listEntryContent}>
          <Text style={styles.entryLabel}>
            {item.name}
          </Text>

          <Text style={styles.entryLabel}>
            Age: <Text style={styles.entryText}>{item.age}</Text>
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listEntry: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgb(140, 140, 140)',
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  listEntryContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  entryAvatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50 / 2,
  },
  entryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default DogListItem;
