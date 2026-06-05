import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onPlay: () => void;
}

export default function HomeScreen({ onPlay }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* Decorative Neon Spheres */}
      <View style={[styles.glowSphere, styles.cyanGlow]} />
      <View style={[styles.glowSphere, styles.pinkGlow]} />

      <View style={styles.content}>
        {/* Logo/Emoji Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>⛳</Text>
          <View style={styles.neonRing} />
        </View>

        {/* Title */}
        <Text style={styles.title}>GOLF</Text>
        <Text style={[styles.title, styles.titleHighlight]}>CHALLENGE</Text>
        
        <Text style={styles.subtitle}>Dikey Neon Tırmanış Platformeri</Text>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Topu geriye doğru sürükleyip fırlatarak deliklere ulaşın. Engelleri aşın ve checkpoint bayraklarını kapın!
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.playButton} onPress={onPlay} activeOpacity={0.8}>
          <Text style={styles.playButtonText}>OYNA</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.5.0 • Anti-Lag Edition</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowSphere: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.15,
  },
  cyanGlow: {
    backgroundColor: '#00f2fe',
    top: -50,
    left: -50,
    shadowColor: '#00f2fe',
    shadowRadius: 100,
    shadowOpacity: 1,
  },
  pinkGlow: {
    backgroundColor: '#db2777',
    bottom: -50,
    right: -50,
    shadowColor: '#db2777',
    shadowRadius: 100,
    shadowOpacity: 1,
  },
  content: {
    width: '85%',
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logoEmoji: {
    fontSize: 50,
  },
  neonRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00f2fe',
    shadowColor: '#00f2fe',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
  },
  titleHighlight: {
    color: '#db2777',
    fontSize: 46,
    textShadowColor: 'rgba(219, 39, 119, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#d6a2e8',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 35,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 232, 0.15)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  infoText: {
    color: '#a4b0be',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  playButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#db2777',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#db2777',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footer: {
    marginTop: 50,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
