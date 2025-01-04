import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

// You can import supported modules from npm
import { Card, TextInput } from 'react-native-paper';
// or any files within the Snack
import AssetExample from './components/AssetExample';
import { colors } from './src/utils/color';
import { Focus } from './src/features/focus';
import { Timer } from './src/features/timer';
import { FocusHistory } from './src/features/focusHistory';

export default function App() {
  console.log('App executed');
  const [currentSubject, setCurrentSubject] = useState();
  // const [history, setHistory] = useState(['temp feature focused']);
  const [history, setHistory] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <> //sample of a fragment
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>

      ) : (
        <Timer
          focusSubject={currentSubject}

          onTimerEnd={(subject) => {
            setHistory([...history, subject])
            }
          }

          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.green,
  },
});
