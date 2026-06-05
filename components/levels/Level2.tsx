import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level2({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={2}
      htmlAsset={require('../../assets/game/level2.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
