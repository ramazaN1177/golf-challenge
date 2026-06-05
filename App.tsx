import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './components/HomeScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import Level1 from './components/levels/Level1';
import Level2 from './components/levels/Level2';
import Level3 from './components/levels/Level3';
import Level4 from './components/levels/Level4';
import Level5 from './components/levels/Level5';
import Level6 from './components/levels/Level6';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'levels' | 'game'>('home');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);

  const handleLevelComplete = (lvl: number) => {
    if (!unlockedLevels.includes(lvl + 1)) {
      setUnlockedLevels([...unlockedLevels, lvl + 1]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {screen === 'home' && (
        <HomeScreen 
          onPlay={() => setScreen('levels')} 
        />
      )}
      {screen === 'levels' && (
        <LevelSelectScreen 
          unlockedLevels={unlockedLevels}
          onSelectLevel={(lvl) => {
            setSelectedLevel(lvl);
            setScreen('game');
          }}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'game' && (
        <>
          {selectedLevel === 1 && (
            <Level1 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
          {selectedLevel === 2 && (
            <Level2 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
          {selectedLevel === 3 && (
            <Level3 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
          {selectedLevel === 4 && (
            <Level4 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
          {selectedLevel === 5 && (
            <Level5 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
          {selectedLevel === 6 && (
            <Level6 
              onBack={() => setScreen('levels')}
              onLevelComplete={handleLevelComplete}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b1a',
  },
});
