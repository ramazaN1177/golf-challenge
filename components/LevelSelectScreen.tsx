import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface LevelSelectScreenProps {
  unlockedLevels: number[];
  onSelectLevel: (level: number) => void;
  onBack: () => void;
}

interface LevelMetadata {
  title: string;
  subtitle: string;
  difficulty: string;
  difficultyColor: string;
  color: string;
  badge: string;
}

const levelMetadata: Record<number, LevelMetadata> = {
  1: { title: 'Neon Vadi', subtitle: 'Giriş & Fizik Temelleri', difficulty: 'KOLAY', difficultyColor: '#2ecc71', color: '#00f2fe', badge: '🟢' },
  2: { title: 'Siber Kule', subtitle: 'Zıplama & Yapışma', difficulty: 'ORTA', difficultyColor: '#f1c40f', color: '#db2777', badge: '🟡' },
  3: { title: 'Buz Kalesi', subtitle: 'Kaygan Zemin & Cam Duvarlar', difficulty: 'ORTA', difficultyColor: '#f1c40f', color: '#70a1ff', badge: '❄️' },
  4: { title: 'Çöküş Eşiği', subtitle: 'Zamanlı Tırmanış Mücadelesi', difficulty: 'ZOR', difficultyColor: '#e67e22', color: '#ffa502', badge: '⏰' },
  5: { title: 'Lazer Reaktörü', subtitle: 'Dar Geçitler & Keskin Açılar', difficulty: 'ZOR', difficultyColor: '#e67e22', color: '#7d5fff', badge: '⚡' },
  6: { title: 'Sanal Labirent', subtitle: 'Nihai Siber Mücadele', difficulty: 'UZMAN', difficultyColor: '#e74c3c', color: '#ff4757', badge: '🔥' },
};

export default function LevelSelectScreen({ unlockedLevels, onSelectLevel, onBack }: LevelSelectScreenProps) {
  const levels = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      {/* Background Decorative Neon Glow Spheres */}
      <View style={[styles.glowSphere, styles.cyanGlow]} />
      <View style={[styles.glowSphere, styles.pinkGlow]} />

      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>❮ GERİ</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>SEVİYELER</Text>
          <Text style={styles.headerSubtitle}>Cyber Neon Golf Challenge</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Level list */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {levels.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl);
          const meta = levelMetadata[lvl] || {
            title: `Seviye ${lvl}`,
            subtitle: 'Bilinmeyen Harita',
            difficulty: 'ORTA',
            difficultyColor: '#f1c40f',
            color: '#00f2fe',
            badge: '🎮',
          };

          return (
            <TouchableOpacity
              key={lvl}
              style={[
                styles.levelCard,
                isUnlocked 
                  ? { borderColor: meta.color + '44', shadowColor: meta.color } 
                  : styles.lockedCard
              ]}
              disabled={!isUnlocked}
              onPress={() => onSelectLevel(lvl)}
              activeOpacity={0.85}
            >
              {/* Left Side: Monospace index */}
              <View style={styles.cardLeft}>
                <Text style={[
                  styles.cardIndex, 
                  isUnlocked ? { color: meta.color } : styles.lockedText
                ]}>
                  {lvl < 10 ? `0${lvl}` : lvl}
                </Text>
              </View>

              {/* Center: Metadata details */}
              <View style={styles.cardCenter}>
                <View style={styles.titleRow}>
                  <Text style={[
                    styles.cardTitle, 
                    isUnlocked ? styles.unlockedText : styles.lockedText
                  ]}>
                    {meta.title}
                  </Text>
                  
                  {isUnlocked && (
                    <View style={[styles.difficultyBadge, { backgroundColor: meta.difficultyColor + '22', borderColor: meta.difficultyColor }]}>
                      <Text style={[styles.difficultyText, { color: meta.difficultyColor }]}>
                        {meta.difficulty}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={[
                  styles.cardSubtitle, 
                  isUnlocked ? styles.unlockedSubtext : styles.lockedSubtext
                ]}>
                  {meta.subtitle}
                </Text>
              </View>

              {/* Right Side: Play / Lock state */}
              <View style={styles.cardRight}>
                {isUnlocked ? (
                  <View style={[styles.playButton, { backgroundColor: meta.color + '15', borderColor: meta.color }]}>
                    <Text style={[styles.playText, { color: meta.color }]}>OYNA ❯</Text>
                  </View>
                ) : (
                  <View style={styles.lockContainer}>
                    <Text style={styles.lockIcon}>🔒</Text>
                    <Text style={styles.lockText}>KİLİTLİ</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070714',
  },
  glowSphere: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.12,
  },
  cyanGlow: {
    backgroundColor: '#00f2fe',
    top: '15%',
    left: '-15%',
  },
  pinkGlow: {
    backgroundColor: '#db2777',
    bottom: '20%',
    right: '-15%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(7, 7, 20, 0.85)',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  backButtonText: {
    color: '#d6a2e8',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 242, 254, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholder: {
    width: 65,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111122',
    borderRadius: 20,
    borderWidth: 1.5,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  lockedCard: {
    backgroundColor: '#090918',
    borderColor: 'rgba(255, 255, 255, 0.03)',
    opacity: 0.4,
  },
  cardLeft: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardIndex: {
    fontSize: 26,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  cardCenter: {
    flex: 1,
    paddingRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  unlockedText: {
    color: '#ffffff',
  },
  unlockedSubtext: {
    color: 'rgba(255, 255, 255, 0.55)',
  },
  lockedText: {
    color: 'rgba(255, 255, 255, 0.15)',
  },
  lockedSubtext: {
    color: 'rgba(255, 255, 255, 0.12)',
  },
  difficultyBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  playButton: {
    borderWidth: 1.2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  playText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  lockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 16,
  },
  lockText: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: '800',
    marginTop: 2,
  },
});
