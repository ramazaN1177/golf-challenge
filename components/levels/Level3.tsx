import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level3({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={3}
      htmlAsset={require('../../assets/game/level3.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
