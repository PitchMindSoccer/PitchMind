import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBg}>
            <Text style={styles.logoText}>PM</Text>
          </View>
          <Text style={styles.brandName}>PitchMind</Text>
        </View>

        {/* Headline */}
        <View style={styles.heroSection}>
          <Text style={styles.headline}>See Every Decision.</Text>
          <Text style={styles.headlineAccent}>Score Every Game.</Text>
          <Text style={styles.tagline}>
            AI-powered decision scoring for soccer players
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Players</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.4M</Text>
            <Text style={styles.statLabel}>Clips</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/account-type')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Get Started →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInLink}
            onPress={() => router.push('/sign-up')}
            activeOpacity={0.7}
          >
            <Text style={styles.signInLinkText}>
              Already have an account?{' '}
              <Text style={styles.signInAccent}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo link */}
        <TouchableOpacity style={styles.demoLink} activeOpacity={0.6}>
          <Text style={styles.demoLinkText}>View Demo →</Text>
        </TouchableOpacity>
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
    minHeight: '100%',
    paddingVertical: 60,
  },
  inner: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  headline: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 42,
  },
  headlineAccent: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  ctaSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  signInLink: {
    paddingVertical: 8,
  },
  signInLinkText: {
    fontSize: 15,
    color: Colors.muted,
  },
  signInAccent: {
    color: Colors.primary,
    fontWeight: '600',
  },
  demoLink: {
    paddingVertical: 8,
  },
  demoLinkText: {
    fontSize: 14,
    color: Colors.muted,
    opacity: 0.7,
  },
});
