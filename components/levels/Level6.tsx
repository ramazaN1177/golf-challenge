import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level6({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={6}
      htmlAsset={require('../../assets/game/level6.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
