import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

const ProfileAvatar = (props) => {
  return (
    <Image
      style={styles.profileAvatar}
      source={props.source}
    />
  );
};

const styles = StyleSheet.create({
  profileAvatar: {
    width: 128,
    height: 128,
    borderRadius: 128 / 2,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 0,
  },
});

export default ProfileAvatar;
