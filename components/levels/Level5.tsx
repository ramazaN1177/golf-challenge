import React from 'react';
import GameWebView from '../GameWebView';

interface LevelProps {
  onBack: () => void;
  onLevelComplete: (level: number) => void;
}

export default function Level5({ onBack, onLevelComplete }: LevelProps) {
  return (
    <GameWebView
      levelNumber={5}
      htmlAsset={require('../../assets/game/level5.html')}
      onBack={onBack}
      onLevelComplete={onLevelComplete}
    />
  );
}
