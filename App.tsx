import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import GameWebView from './components/GameWebView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <GameWebView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
