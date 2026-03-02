import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

type AccountType = 'player' | 'coach' | null;

export default function AccountTypeScreen() {
  const [selected, setSelected] = useState<AccountType>(null);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        {/* Header */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Who are you?</Text>
          <Text style={styles.subtitle}>
            Tell us your role so we can personalize your experience
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, selected === 'player' && styles.optionCardSelected]}
            onPress={() => setSelected('player')}
            activeOpacity={0.8}
          >
            <View style={[styles.optionIcon, selected === 'player' && styles.optionIconSelected]}>
              <Text style={styles.optionEmoji}>⚽</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, selected === 'player' && styles.optionTitleSelected]}>
                Player
              </Text>
              <Text style={styles.optionDesc}>
                Track your own decisions, get personalized feedback, and improve your game
              </Text>
            </View>
            <View style={[styles.radioOuter, selected === 'player' && styles.radioOuterSelected]}>
              {selected === 'player' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, selected === 'coach' && styles.optionCardSelected]}
            onPress={() => setSelected('coach')}
            activeOpacity={0.8}
          >
            <View style={[styles.optionIcon, selected === 'coach' && styles.optionIconSelected]}>
              <Text style={styles.optionEmoji}>📋</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, selected === 'coach' && styles.optionTitleSelected]}>
                Coach
              </Text>
              <Text style={styles.optionDesc}>
                Analyze your team's decisions, compare players, and develop tactics
              </Text>
            </View>
            <View style={[styles.radioOuter, selected === 'coach' && styles.radioOuterSelected]}>
              {selected === 'coach' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={() => selected && router.push('/sign-up')}
          activeOpacity={0.85}
          disabled={!selected}
        >
          <Text style={styles.continueBtnText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    color: Colors.muted,
    fontSize: 16,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    gap: 16,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#0D1F2D',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconSelected: {
    backgroundColor: `${Colors.primary}20`,
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: Colors.primary,
  },
  optionDesc: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 20,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  continueBtn: {
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
  continueBtnDisabled: {
    opacity: 0.4,
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
});
