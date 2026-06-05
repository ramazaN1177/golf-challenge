import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level1({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={1}
      htmlAsset={require('../../assets/game/level1.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
