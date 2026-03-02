import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = Math.min(SCREEN_WIDTH, Colors.maxWidth);

const SLIDES = [
  {
    id: '1',
    emoji: '🎥',
    title: 'Upload Your Game',
    description:
      'Record or upload footage from any match. PitchMind works with any camera angle — phone, GoPro, or stadium footage.',
    color: Colors.primary,
  },
  {
    id: '2',
    emoji: '🤖',
    title: 'AI Analyzes Every Decision',
    description:
      'Our AI scans every touch, pass, dribble, and shot — tagging each decision with context from your position and the game state.',
    color: Colors.orange,
  },
  {
    id: '3',
    emoji: '📊',
    title: 'Get Your Decision Score',
    description:
      'Two scores for every clip: Probability (was it the right call?) and Execution (did you do it well?). Clear, actionable feedback.',
    color: '#7C3AED',
  },
  {
    id: '4',
    emoji: '🏋️',
    title: 'Train Your Weak Spots',
    description:
      'AI generates targeted training drills for your 3 weakest decision areas. Improve faster with data-driven workouts.',
    color: Colors.primary,
  },
];

export default function WalkthroughScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <View style={styles.slideInner}>
              <View style={[styles.emojiContainer, { borderColor: `${item.color}40` }]}>
                <View style={[styles.emojiBg, { backgroundColor: `${item.color}20` }]}>
                  <Text style={styles.slideEmoji}>{item.emoji}</Text>
                </View>
              </View>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDesc}>{item.description}</Text>
            </View>
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setActiveIndex(idx);
        }}
        scrollEventThrottle={16}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Next / Let's Go Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>
            {activeIndex === SLIDES.length - 1 ? "Let's Go →" : 'Next →'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.stepText}>{activeIndex + 1} of {SLIDES.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 20,
  },
  skipText: { fontSize: 15, color: Colors.muted },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  slideInner: {
    alignItems: 'center',
    maxWidth: Colors.maxWidth,
  },
  emojiContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  emojiBg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideEmoji: { fontSize: 56 },
  slideTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDesc: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  bottomSection: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 24,
    gap: 14,
    alignItems: 'center',
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  nextBtnText: { fontSize: 17, fontWeight: '700', color: Colors.white },
  stepText: { fontSize: 13, color: Colors.muted },
});
