const fs = require('fs');
const path = require('path');

// Seviye Verileri
const levels = {
  1: {
    levelNumber: 1,
    levelHeight: 2000,
    ballStart: { x: 120, y: 1724 },
    portal: { x: 180, y: 420 },
    water: { x: 260, y: 1750, w: 180, h: 60 },
    grounds: [
      { x: 120, y: 1750, w: 80, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 40, y: 1650, w: 100, h: 24, type: 'normal' },
      { x: 120, y: 1550, w: 120, h: 24, type: 'normal', angle: 0.4 },
      { x: 220, y: 1792, w: 180, h: 24, type: 'normal' },
      { x: 320, y: 1720, w: 40, h: 120, type: 'normal' },
      { x: 120, y: 1380, w: 100, h: 24, type: 'sticky' },
      { x: 250, y: 1220, w: 95, h: 24, type: 'bouncy' },
      { x: 150, y: 1060, w: 110, h: 24, type: 'crumbling' },
      { x: 90, y: 900, w: 30, h: 100, type: 'breakable' },
      { x: 260, y: 900, w: 90, h: 24, type: 'normal', isCheckpoint: true },
      { x: 110, y: 740, w: 115, h: 24, type: 'icy' },
      { x: 240, y: 580, w: 95, h: 24, type: 'bouncy' },
      { x: 160, y: 480, w: 120, h: 24, type: 'normal', isCheckpoint: true }
    ]
  },
  2: {
    levelNumber: 2,
    levelHeight: 2200,
    ballStart: { x: 100, y: 1924 },
    portal: { x: 180, y: 420 },
    water: { x: 250, y: 1950, w: 200, h: 60 },
    grounds: [
      { x: 100, y: 1950, w: 80, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 200, y: 1992, w: 200, h: 24, type: 'normal' },
      { x: 300, y: 1920, w: 40, h: 120, type: 'normal' },
      { x: 80, y: 1780, w: 90, h: 24, type: 'sticky' },
      { x: 220, y: 1620, w: 75, h: 24, type: 'bouncy' },
      { x: 120, y: 1460, w: 90, h: 24, type: 'crumbling' },
      { x: 260, y: 1300, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 90, y: 1140, w: 105, h: 24, type: 'icy' },
      { x: 230, y: 980, w: 85, h: 24, type: 'bouncy' },
      { x: 120, y: 820, w: 90, h: 24, type: 'crumbling' },
      { x: 180, y: 660, w: 30, h: 100, type: 'breakable' },
      { x: 180, y: 480, w: 100, h: 24, type: 'normal', isCheckpoint: true }
    ]
  },
  3: {
    levelNumber: 3,
    levelHeight: 2300,
    ballStart: { x: 150, y: 2024 },
    portal: { x: 180, y: 400 },
    water: { x: 250, y: 2050, w: 200, h: 60 },
    grounds: [
      { x: 150, y: 2050, w: 90, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 240, y: 2092, w: 180, h: 24, type: 'normal' },
      { x: 330, y: 2000, w: 30, h: 140, type: 'normal' },
      { x: 100, y: 1900, w: 100, h: 24, type: 'icy' },
      { x: 260, y: 1780, w: 120, h: 24, type: 'normal', angle: -0.25 },
      { x: 120, y: 1620, w: 80, h: 24, type: 'bouncy' },
      { x: 200, y: 1520, w: 100, h: 24, type: 'breakable' },
      { x: 100, y: 1400, w: 90, h: 24, type: 'normal', isCheckpoint: true },
      { x: 240, y: 1260, w: 130, h: 24, type: 'icy', angle: 0.15 },
      { x: 100, y: 1100, w: 70, h: 24, type: 'bouncy' },
      { x: 180, y: 950, w: 30, h: 100, type: 'breakable' },
      { x: 260, y: 880, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 100, y: 720, w: 100, h: 24, type: 'sticky' },
      { x: 220, y: 580, w: 140, h: 24, type: 'icy', angle: -0.1 },
      { x: 180, y: 460, w: 120, h: 24, type: 'normal', isCheckpoint: true }
    ]
  },
  4: {
    levelNumber: 4,
    levelHeight: 2400,
    ballStart: { x: 100, y: 2124 },
    portal: { x: 200, y: 410 },
    water: { x: 220, y: 2150, w: 240, h: 60 },
    grounds: [
      { x: 100, y: 2150, w: 80, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 220, y: 2192, w: 200, h: 24, type: 'normal' },
      { x: 320, y: 2120, w: 40, h: 120, type: 'normal' },
      { x: 250, y: 2020, w: 90, h: 24, type: 'crumbling' },
      { x: 120, y: 1880, w: 90, h: 24, type: 'crumbling' },
      { x: 250, y: 1740, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 100, y: 1600, w: 80, h: 24, type: 'crumbling' },
      { x: 220, y: 1450, w: 110, h: 24, type: 'crumbling', angle: -0.2 },
      { x: 120, y: 1300, w: 90, h: 24, type: 'crumbling' },
      { x: 260, y: 1160, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 110, y: 1000, w: 120, h: 24, type: 'crumbling', angle: 0.3 },
      { x: 250, y: 880, w: 80, h: 24, type: 'sticky' },
      { x: 100, y: 740, w: 90, h: 24, type: 'crumbling' },
      { x: 220, y: 600, w: 90, h: 24, type: 'crumbling' },
      { x: 200, y: 470, w: 120, h: 24, type: 'normal', isCheckpoint: true }
    ]
  },
  5: {
    levelNumber: 5,
    levelHeight: 2600,
    ballStart: { x: 80, y: 2324 },
    portal: { x: 180, y: 400 },
    water: { x: 220, y: 2350, w: 280, h: 60 },
    grounds: [
      { x: 80, y: 2350, w: 80, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 220, y: 2392, w: 280, h: 24, type: 'normal' },
      { x: 360, y: 2300, w: 40, h: 160, type: 'normal' },
      { x: 250, y: 2220, w: 100, h: 24, type: 'normal' },
      { x: 120, y: 2080, w: 90, h: 24, type: 'sticky' },
      { x: 260, y: 1940, w: 80, h: 24, type: 'bouncy' },
      { x: 120, y: 1800, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 240, y: 1660, w: 30, h: 100, type: 'breakable' },
      { x: 150, y: 1540, w: 100, h: 24, type: 'icy' },
      { x: 280, y: 1380, w: 80, h: 24, type: 'crumbling' },
      { x: 140, y: 1240, w: 110, h: 24, type: 'normal', isCheckpoint: true },
      { x: 260, y: 1100, w: 140, h: 24, type: 'icy', angle: -0.2 },
      { x: 100, y: 960, w: 70, h: 24, type: 'bouncy' },
      { x: 220, y: 840, w: 120, h: 24, type: 'breakable' },
      { x: 120, y: 720, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 240, y: 580, w: 90, h: 24, type: 'normal' },
      { x: 180, y: 460, w: 120, h: 24, type: 'normal', isCheckpoint: true }
    ]
  },
  6: {
    levelNumber: 6,
    levelHeight: 2800,
    ballStart: { x: 100, y: 2524 },
    portal: { x: 180, y: 380 },
    water: { x: 240, y: 2550, w: 280, h: 60 },
    grounds: [
      { x: 100, y: 2550, w: 80, h: 24, type: 'normal', isCheckpoint: true, checkpointActivated: true },
      { x: 240, y: 2592, w: 280, h: 24, type: 'normal' },
      { x: 380, y: 2400, w: 40, h: 360, type: 'normal' },
      { x: 250, y: 2420, w: 120, h: 24, type: 'icy', angle: 0.1 },
      { x: 120, y: 2280, w: 80, h: 24, type: 'bouncy' },
      { x: 260, y: 2140, w: 90, h: 24, type: 'sticky' },
      { x: 140, y: 2000, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 260, y: 1880, w: 80, h: 24, type: 'crumbling' },
      { x: 120, y: 1740, w: 80, h: 24, type: 'crumbling' },
      { x: 240, y: 1600, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 180, y: 1480, w: 100, h: 24, type: 'breakable' },
      { x: 100, y: 1340, w: 70, h: 24, type: 'bouncy' },
      { x: 260, y: 1220, w: 120, h: 24, type: 'icy', angle: -0.25 },
      { x: 140, y: 1080, w: 100, h: 24, type: 'normal', isCheckpoint: true },
      { x: 250, y: 940, w: 80, h: 24, type: 'crumbling' },
      { x: 120, y: 820, w: 90, h: 24, type: 'sticky' },
      { x: 220, y: 680, w: 30, h: 100, type: 'breakable' },
      { x: 220, y: 560, w: 120, h: 24, type: 'normal', isCheckpoint: true },
      { x: 180, y: 440, w: 100, h: 24, type: 'normal', isCheckpoint: true }
    ]
  }
};

const templatePath = path.join(__dirname, '../assets/game/template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Read local library files and inline them directly by escaping any </script> tags
const pixiPath = path.join(__dirname, '../assets/game/js/pixi.min.js');
const matterPath = path.join(__dirname, '../assets/game/js/matter.min.js');
const pixiCode = fs.readFileSync(pixiPath, 'utf8').replace(/<\/script>/gi, '<\\/script>');
const matterCode = fs.readFileSync(matterPath, 'utf8').replace(/<\/script>/gi, '<\\/script>');

const pixiReplacement = `<!-- PixiJS v8 Local Raw -->\n    <script>${pixiCode}</script>`;
const matterReplacement = `<!-- Matter.js Local Raw -->\n    <script>${matterCode}</script>`;

const pixiRegex = /<!-- PixiJS v8 CDN -->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/pixi\.js@8\/dist\/pixi\.min\.js"><\/script>/i;
const matterRegex = /<!-- Matter\.js CDN -->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/matter-js@0\.20\.0\/build\/matter\.min\.js"><\/script>/i;

// Regex to find levelData object and title
const titleRegex = /<title>Level \d+ - Golf Challenge<\/title>/i;
const levelDataRegex = /const levelData = \{[\s\S]*?\};/;

for (let lvlNum = 1; lvlNum <= 6; lvlNum++) {
  const levelConfig = levels[lvlNum];
  const targetPath = path.join(__dirname, `../assets/game/level${lvlNum}.html`);
  
  // Replace Title
  let levelHtml = template.replace(titleRegex, '<title>Level ' + lvlNum + ' - Golf Challenge</title>');
  
  // Embed local library files directly using functions to prevent '$' replacement glitches in minified JS
  levelHtml = levelHtml.replace(pixiRegex, () => pixiReplacement);
  levelHtml = levelHtml.replace(matterRegex, () => matterReplacement);

  // Format the levelConfig as JSON indentation matching structure
  const levelConfigStr = `const levelData = ${JSON.stringify(levelConfig, null, 16)};`;
  
  // Replace levelData
  levelHtml = levelHtml.replace(levelDataRegex, () => levelConfigStr);
  
  fs.writeFileSync(targetPath, levelHtml, 'utf8');
  console.log(`Generated self-contained: level${lvlNum}.html`);
}

console.log('All level HTML files generated with local assets successfully!');
