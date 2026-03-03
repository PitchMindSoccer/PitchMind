import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Colors';

const CLIPS = [
  { id: '1', minute: "12'", type: 'Through Ball', prob: 88, exec: 82, outcome: 'Good' },
  { id: '2', minute: "23'", type: 'Press Resistance', prob: 55, exec: 60, outcome: 'Poor' },
  { id: '3', minute: "31'", type: 'Switch of Play', prob: 76, exec: 71, outcome: 'OK' },
  { id: '4', minute: "44'", type: 'Shot Decision', prob: 92, exec: 88, outcome: 'Excellent' },
  { id: '5', minute: "58'", type: 'Dribble Attempt', prob: 62, exec: 68, outcome: 'OK' },
  { id: '6', minute: "67'", type: 'Through Ball', prob: 84, exec: 79, outcome: 'Good' },
  { id: '7', minute: "74'", type: 'Press Resistance', prob: 48, exec: 52, outcome: 'Poor' },
  { id: '8', minute: "82'", type: 'Header Clearance', prob: 90, exec: 87, outcome: 'Excellent' },
];

const BREAKDOWN = [
  { type: 'Through Ball', count: 2, avgScore: 86 },
  { type: 'Press Resistance', count: 2, avgScore: 54 },
  { type: 'Switch of Play', count: 1, avgScore: 74 },
  { type: 'Shot Decision', count: 1, avgScore: 90 },
  { type: 'Dribble Attempt', count: 1, avgScore: 65 },
  { type: 'Header Clearance', count: 1, avgScore: 89 },
];

function getOutcomeColor(outcome: string) {
  switch (outcome) {
    case 'Excellent': return Colors.primary;
    case 'Good': return '#4CAF50';
    case 'OK': return Colors.orange;
    case 'Poor': return '#FF4757';
    default: return Colors.muted;
  }
}

function ScoreDonut({ score, color, size = 80 }: { score: number; color: string; size?: number }) {
  const stroke = 7;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (1 - score / 100);

  return (
    <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={Colors.border}
          strokeWidth={stroke}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circ}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color }}>{score}</Text>
      </View>
    </View>
  );
}

export default function DecisionScoreScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Decision Score</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Match Info */}
      <View style={styles.matchBanner}>
        <Text style={styles.matchTitle}>vs. FC Barcelona</Text>
        <View style={styles.matchMeta}>
          <Text style={styles.matchMetaText}>Feb 28, 2026</Text>
          <Text style={styles.matchMetaDot}>·</Text>
          <Text style={styles.matchMetaText}>24 clips</Text>
          <Text style={styles.matchMetaDot}>·</Text>
          <View style={styles.resultBadge}>
            <Text style={styles.resultBadgeText}>W 3-1</Text>
          </View>
        </View>
      </View>

      {/* Overall Score Cards */}
      <View style={styles.scoreCardsRow}>
        <View style={styles.scoreCard}>
          <ScoreDonut score={82} color={Colors.primary} size={90} />
          <Text style={styles.scoreCardLabel}>Probability</Text>
          <Text style={styles.scoreCardSub}>Right decision %</Text>
        </View>
        <View style={styles.scoreCardDivider} />
        <View style={styles.scoreCard}>
          <ScoreDonut score={79} color={Colors.orange} size={90} />
          <Text style={styles.scoreCardLabel}>Execution</Text>
          <Text style={styles.scoreCardSub}>How well done</Text>
        </View>
        <View style={styles.scoreCardDivider} />
        <View style={styles.scoreCard}>
          <ScoreDonut score={81} color="#7C3AED" size={90} />
          <Text style={styles.scoreCardLabel}>Overall</Text>
          <Text style={styles.scoreCardSub}>Combined score</Text>
        </View>
      </View>

      {/* Breakdown by type */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>By Decision Type</Text>
      </View>
      <View style={styles.breakdownCard}>
        {BREAKDOWN.map((item, i) => (
          <View key={i} style={[styles.breakdownRow, i < BREAKDOWN.length - 1 && styles.breakdownRowBorder]}>
            <View style={styles.breakdownLeft}>
              <Text style={styles.breakdownType}>{item.type}</Text>
              <Text style={styles.breakdownCount}>{item.count} clip{item.count > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.breakdownRight}>
              <View style={styles.miniBarOuter}>
                <View
                  style={[
                    styles.miniBarInner,
                    {
                      width: `${item.avgScore}%`,
                      backgroundColor: item.avgScore >= 80 ? Colors.primary : item.avgScore >= 65 ? Colors.orange : '#FF4757',
                    },
                  ]}
                />
              </View>
              <Text style={[
                styles.breakdownScore,
                { color: item.avgScore >= 80 ? Colors.primary : item.avgScore >= 65 ? Colors.orange : '#FF4757' }
              ]}>
                {item.avgScore}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Clip Cards */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All Clips</Text>
        <Text style={styles.sectionSub}>{CLIPS.length} decisions</Text>
      </View>

      {CLIPS.map((clip) => (
        <TouchableOpacity
          key={clip.id}
          style={styles.clipCard}
          onPress={() => router.push('/clip-detail')}
          activeOpacity={0.85}
        >
          <View style={styles.clipLeft}>
            <View style={styles.clipMinuteBadge}>
              <Text style={styles.clipMinute}>{clip.minute}</Text>
            </View>
            <View>
              <Text style={styles.clipType}>{clip.type}</Text>
              <View style={[styles.outcomeBadge, { backgroundColor: `${getOutcomeColor(clip.outcome)}20` }]}>
                <Text style={[styles.outcomeText, { color: getOutcomeColor(clip.outcome) }]}>
                  {clip.outcome}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.clipRight}>
            <View style={styles.clipScores}>
              <View style={styles.clipScore}>
                <Text style={[styles.clipScoreNum, { color: Colors.primary }]}>{clip.prob}</Text>
                <Text style={styles.clipScoreLabel}>P</Text>
              </View>
              <View style={styles.clipScore}>
                <Text style={[styles.clipScoreNum, { color: Colors.orange }]}>{clip.exec}</Text>
                <Text style={styles.clipScoreLabel}>E</Text>
              </View>
            </View>
            <Text style={styles.clipArrow}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: {
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    maxWidth: Colors.maxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backText: { color: Colors.muted, fontSize: 16 },
  topBarTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  matchBanner: {
    width: '100%',
    marginBottom: 20,
  },
  matchTitle: { fontSize: 24, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  matchMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  matchMetaText: { fontSize: 13, color: Colors.muted },
  matchMetaDot: { fontSize: 13, color: Colors.muted },
  resultBadge: {
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: `${Colors.primary}40`,
  },
  resultBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  scoreCardsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'space-around',
  },
  scoreCard: { alignItems: 'center', flex: 1, gap: 6 },
  scoreCardLabel: { fontSize: 13, fontWeight: '700', color: Colors.white },
  scoreCardSub: { fontSize: 10, color: Colors.muted, textAlign: 'center' },
  scoreCardDivider: { width: 1, backgroundColor: Colors.border },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  sectionSub: { fontSize: 13, color: Colors.muted },
  breakdownCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  breakdownRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  breakdownLeft: {},
  breakdownType: { fontSize: 14, fontWeight: '600', color: Colors.white, marginBottom: 2 },
  breakdownCount: { fontSize: 11, color: Colors.muted },
  breakdownRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  miniBarOuter: { width: 80, height: 6, backgroundColor: Colors.background, borderRadius: 3, overflow: 'hidden' },
  miniBarInner: { height: '100%', borderRadius: 3 },
  breakdownScore: { fontSize: 16, fontWeight: '800', minWidth: 28, textAlign: 'right' },
  clipCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    width: '100%',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clipLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  clipMinuteBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clipMinute: { fontSize: 12, fontWeight: '700', color: Colors.muted },
  clipType: { fontSize: 14, fontWeight: '600', color: Colors.white, marginBottom: 4 },
  outcomeBadge: { borderRadius: 6, paddingVertical: 2, paddingHorizontal: 8, alignSelf: 'flex-start' },
  outcomeText: { fontSize: 11, fontWeight: '700' },
  clipRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  clipScores: { flexDirection: 'row', gap: 10 },
  clipScore: { alignItems: 'center' },
  clipScoreNum: { fontSize: 20, fontWeight: '800' },
  clipScoreLabel: { fontSize: 10, color: Colors.muted },
  clipArrow: { fontSize: 20, color: Colors.muted },
});
