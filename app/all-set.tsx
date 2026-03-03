import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function AllSetScreen() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        {/* Celebration animation */}
        <Animated.View
          style={[styles.celebrationContainer, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.confettiRing}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>
          <Text style={styles.confettiEmoji}>🎉</Text>
        </Animated.View>

        <Animated.View style={[styles.textContent, { opacity: fadeAnim }]}>
          <Text style={styles.title}>You're All Set!</Text>
          <Text style={styles.subtitle}>
            Your profile is ready. Time to start scoring decisions and unlocking your potential.
          </Text>

          {/* Feature highlights */}
          <View style={styles.featuresCard}>
            {[
              { icon: '🎯', text: 'AI analyzes every decision you make' },
              { icon: '📊', text: 'Get probability & execution scores' },
              { icon: '📈', text: 'Track your improvement over time' },
              { icon: '💡', text: 'Personalized training recommendations' },
            ].map((feature, i) => (
              <View key={i} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaSection}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.replace('/(tabs)/upload')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>⬆️  Upload My First Game →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryBtnText}>Explore the app first →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  inner: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  confettiRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: `${Colors.primary}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  checkIcon: {
    fontSize: 44,
    color: Colors.white,
    fontWeight: '800',
  },
  confettiEmoji: {
    fontSize: 36,
    position: 'absolute',
    top: -12,
    right: -12,
  },
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
    maxWidth: 320,
  },
  featuresCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    gap: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureIcon: { fontSize: 22 },
  featureText: { fontSize: 15, color: Colors.white, flex: 1, lineHeight: 20 },
  ctaSection: { width: '100%', gap: 14 },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
  secondaryBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryBtnText: { fontSize: 16, fontWeight: '600', color: Colors.muted },
});
