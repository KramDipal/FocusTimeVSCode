import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/color';
import { Card, TextInput } from 'react-native-paper';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../utils/size'

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  console.log(subject);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      
        <TextInput
        style = {styles.TextInput}
          onChangeText={setSubject}
          label="What would you like to focus on?"
        />

        <View style={styles.Button}>
          <RoundedButton title="+" size={50} onPress={() => addSubject(subject)} />
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  Button: {
      justifyContent: 'center'
  },
  TextInput : {
    flex: 1,
    marginRight: spacing.sm
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  }
});
