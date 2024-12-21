import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/size';
import { colors } from '../utils/color';

const minutesToMillis = (min) => Math.round(min * 1000 * 60); // Ensure integer value
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);

  // Initialize millis with rounded value to ensure it's an integer
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  // set isReset from false to true and vise versa.
  const [isReset, setIsReset] = useState(false);

  // set isReset from false to true and vise versa.
  const reset = useCallback(() => {
    setIsReset((prev) => !prev); // Toggle isReset to trigger re-render
  }, []);

  const countDown = useCallback(() => {
    setMillis((time) => {
      if (time <= 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return 0;
      }
      const timeLeft = time - 1000;
      return Math.max(timeLeft, 0); // Ensure no negative time
    });
  }, [onEnd, reset]);


  //useEffect is called when the state changes
  //isReset changes the state of the callback to true and vise versa

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
    console.log(`Setting initial millis: ${minutesToMillis(minutes)}`);
  }, [minutes, isReset]); // Add isReset as a dependency



  useEffect(() => {
    const progress = millis / minutesToMillis(minutes);
    onProgress(Math.round(progress * 100) / 100); // Round to two decimal places for progress
    console.log(`Millis updated: ${millis}`);
    console.log(`Progress: ${Math.round(progress * 100) / 100}`);
  }, [millis, minutes, onProgress]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      console.log('Paused');
      return;
    }

    interval.current = setInterval(countDown, 1000);
    console.log('Running countdown');

    return () => clearInterval(interval.current);
  }, [isPaused, countDown]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  console.log(`Rendering: ${minute}:${seconds}`);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
