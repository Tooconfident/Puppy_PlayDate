import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputText = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={styles.inputText}
      value={props.value}
      onChangeText={props.onChangeText}
      autoCapitalize={props.autoCapitalize}
      autoCorrect={props.autoCorrect}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  inputText: {
    color: 'rgb(239,239,239)',
    height: 40,
    //marginTop: 10,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#114800',
    backgroundColor: 'rgba(51, 31, 14, 0.40)'//'#ff9c4a',
  }
});

export { InputText };
