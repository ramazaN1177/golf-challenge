import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level4({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={4}
      htmlAsset={require('../../assets/game/level4.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
