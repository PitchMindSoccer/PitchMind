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

const FEATURES = [
  { included: true, text: 'Unlimited video uploads' },
  { included: true, text: 'AI decision scoring (Probability + Execution)' },
  { included: true, text: 'Full clip-by-clip breakdown' },
  { included: true, text: 'Personalized training recommendations' },
  { included: true, text: 'Progress tracking & trend charts' },
  { included: true, text: 'Position-specific benchmarks' },
  { included: false, text: 'Team management (Coach plan)' },
  { included: false, text: 'Multi-player comparison (Coach plan)' },
];

export default function PricingScreen() {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.trialBadge}>
            <Text style={styles.trialBadgeText}>🎁  7-Day Free Trial</Text>
          </View>
          <Text style={styles.title}>Unlock Full Access</Text>
          <Text style={styles.subtitle}>Try everything free. Cancel anytime.</Text>
        </View>

        {/* Plan Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, plan === 'monthly' && styles.toggleBtnActive]}
            onPress={() => setPlan('monthly')}
          >
            <Text style={[styles.toggleBtnText, plan === 'monthly' && styles.toggleBtnTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, plan === 'yearly' && styles.toggleBtnActive]}
            onPress={() => setPlan('yearly')}
          >
            <Text style={[styles.toggleBtnText, plan === 'yearly' && styles.toggleBtnTextActive]}>
              Yearly
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 40%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {plan === 'monthly' ? '$9.99' : '$5.99'}
            </Text>
            <Text style={styles.pricePeriod}>/month</Text>
          </View>
          {plan === 'yearly' && (
            <Text style={styles.billedAs}>Billed as $71.88/year</Text>
          )}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Everything included:</Text>
          {FEATURES.map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={[styles.featureCheck, !feature.included && styles.featureX]}>
                {feature.included ? '✓' : '✕'}
              </Text>
              <Text style={[styles.featureText, !feature.included && styles.featureTextMuted]}>
                {feature.text}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.trialBtn}
          onPress={() => router.push('/walkthrough')}
          activeOpacity={0.85}
        >
          <Text style={styles.trialBtnText}>Start Free Trial →</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          No charge for 7 days. Cancel anytime before trial ends.
        </Text>
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
  backBtn: { marginBottom: 24 },
  backText: { color: Colors.muted, fontSize: 16 },
  header: { alignItems: 'center', marginBottom: 28 },
  trialBadge: {
    backgroundColor: `${Colors.orange}20`,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${Colors.orange}40`,
  },
  trialBadgeText: { fontSize: 14, fontWeight: '700', color: Colors.orange },
  title: { fontSize: 30, fontWeight: '800', color: Colors.white, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.muted, textAlign: 'center' },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  toggleBtnActive: { backgroundColor: Colors.primary },
  toggleBtnText: { fontSize: 15, fontWeight: '600', color: Colors.muted },
  toggleBtnTextActive: { color: Colors.white },
  saveBadge: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  saveBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.white },
  pricingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  price: { fontSize: 48, fontWeight: '800', color: Colors.primary },
  pricePeriod: { fontSize: 18, color: Colors.muted, marginBottom: 8 },
  billedAs: { fontSize: 13, color: Colors.muted, marginTop: 4 },
  featuresContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuresTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureCheck: { fontSize: 16, color: Colors.primary, fontWeight: '700', width: 20 },
  featureX: { color: Colors.muted },
  featureText: { fontSize: 14, color: Colors.white, flex: 1 },
  featureTextMuted: { color: Colors.muted },
  trialBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  trialBtnText: { fontSize: 17, fontWeight: '700', color: Colors.white },
  disclaimer: { fontSize: 13, color: Colors.muted, textAlign: 'center', lineHeight: 20 },
});
