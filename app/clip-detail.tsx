import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CLIPS_DATA = [
  {
    id: '1',
    minute: "12'",
    type: 'Through Ball',
    prob: 88,
    exec: 82,
    outcome: 'Good',
    aiSummary: 'You identified the runner\'s run early and played the ball at the right moment. The pass split the defensive line with 78% precision.',
    alternatives: [
      { label: 'Layoff pass', rating: 'Lower risk', score: 72 },
      { label: 'Hold & turn', rating: 'Conservative', score: 61 },
    ],
    breakdown: [
      { aspect: 'Decision Timing', score: 90 },
      { aspect: 'Weight of Pass', score: 85 },
      { aspect: 'Body Position', score: 80 },
      { aspect: 'Field Awareness', score: 88 },
    ],
  },
  {
    id: '2',
    minute: "23'",
    type: 'Press Resistance',
    prob: 55,
    exec: 60,
    outcome: 'Poor',
    aiSummary: 'You attempted to dribble out of pressure in a dangerous zone. With two defenders pressing, a simple back pass had 91% success probability.',
    alternatives: [
      { label: 'Back pass to CB', rating: 'High probability', score: 91 },
      { label: 'Switch left', rating: 'Medium risk', score: 78 },
    ],
    breakdown: [
      { aspect: 'Decision Timing', score: 50 },
      { aspect: 'Pressure Reading', score: 55 },
      { aspect: 'Body Position', score: 62 },
      { aspect: 'Field Awareness', score: 58 },
    ],
  },
];

function ScoreRing({ score, color, size = 70 }: { score: number; color: string; size?: number }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Svg width={size} height={size}>
        <Circle cx={size/2} cy={size/2} r={r} fill="none" stroke={Colors.border} strokeWidth={stroke} />
        <Circle
          cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size/2},${size/2}`}
        />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Text style={{ fontSize: 16, fontWeight: '800', color }}>{score}</Text>
      </View>
    </View>
  );
}

function getOutcomeColor(outcome: string) {
  switch (outcome) {
    case 'Excellent': return Colors.primary;
    case 'Good': return '#4CAF50';
    case 'OK': return Colors.orange;
    case 'Poor': return '#FF4757';
    default: return Colors.muted;
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return Colors.primary;
  if (score >= 65) return Colors.orange;
  return '#FF4757';
}

export default function ClipDetailScreen() {
  const [clipIndex, setClipIndex] = useState(0);
  const clip = CLIPS_DATA[clipIndex % CLIPS_DATA.length];

  const goBack = () => {
    if (clipIndex > 0) {
      setClipIndex(clipIndex - 1);
    } else {
      router.back();
    }
  };

  const goNext = () => {
    if (clipIndex < CLIPS_DATA.length - 1) {
      setClipIndex(clipIndex + 1);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{clip.minute} · {clip.type}</Text>
        <Text style={styles.clipCounter}>{clipIndex + 1}/{CLIPS_DATA.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Video Placeholder */}
        <View style={styles.videoPlaceholder}>
          <View style={styles.videoOverlay}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </TouchableOpacity>
            <View style={styles.videoMeta}>
              <Text style={styles.videoMetaText}>Clip {clipIndex + 1} of {CLIPS_DATA.length}</Text>
              <Text style={styles.videoMetaType}>{clip.type}</Text>
            </View>
          </View>
          {/* Timeline bar */}
          <View style={styles.timelineBar}>
            <View style={styles.timelineTrack}>
              <View style={[styles.timelineProgress, { width: '42%' }]} />
              <View style={styles.timelineThumb} />
            </View>
            <View style={styles.timelineLabels}>
              <Text style={styles.timelineLabel}>0:00</Text>
              <Text style={styles.timelineLabel}>0:08</Text>
            </View>
          </View>
        </View>

        {/* Score Row */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <ScoreRing score={clip.prob} color={Colors.primary} />
            <Text style={styles.scoreLabel}>Probability</Text>
          </View>
          <View style={styles.overallScore}>
            <Text style={styles.overallNum}>{Math.round((clip.prob + clip.exec) / 2)}</Text>
            <Text style={styles.overallLabel}>Overall</Text>
            <View style={[styles.outcomeBadge, { backgroundColor: `${getOutcomeColor(clip.outcome)}20`, borderColor: `${getOutcomeColor(clip.outcome)}40` }]}>
              <Text style={[styles.outcomeText, { color: getOutcomeColor(clip.outcome) }]}>{clip.outcome}</Text>
            </View>
          </View>
          <View style={styles.scoreItem}>
            <ScoreRing score={clip.exec} color={Colors.orange} />
            <Text style={styles.scoreLabel}>Execution</Text>
          </View>
        </View>

        {/* AI Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤖 AI Analysis</Text>
          <Text style={styles.aiText}>{clip.aiSummary}</Text>
        </View>

        {/* Decision Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Decision Breakdown</Text>
          <View style={styles.breakdownList}>
            {clip.breakdown.map((item, i) => (
              <View key={i} style={styles.breakdownRow}>
                <Text style={styles.breakdownAspect}>{item.aspect}</Text>
                <View style={styles.breakdownBarOuter}>
                  <View
                    style={[
                      styles.breakdownBarInner,
                      {
                        width: `${item.score}%`,
                        backgroundColor: getScoreColor(item.score),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.breakdownScore, { color: getScoreColor(item.score) }]}>
                  {item.score}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alternative Decisions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alternative Decisions</Text>
          <Text style={styles.altSubtitle}>What else could you have done?</Text>
          {clip.alternatives.map((alt, i) => (
            <View key={i} style={styles.altRow}>
              <View style={styles.altInfo}>
                <Text style={styles.altLabel}>{alt.label}</Text>
                <Text style={styles.altRating}>{alt.rating}</Text>
              </View>
              <Text style={[styles.altScore, { color: getScoreColor(alt.score) }]}>{alt.score}%</Text>
            </View>
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, clipIndex === 0 && styles.navBtnDisabled]}
            onPress={goBack}
            disabled={clipIndex === 0}
          >
            <Text style={styles.navBtnText}>← Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnNext, clipIndex >= CLIPS_DATA.length - 1 && styles.navBtnDisabled]}
            onPress={goNext}
            disabled={clipIndex >= CLIPS_DATA.length - 1}
          >
            <Text style={[styles.navBtnText, styles.navBtnNextText]}>Next →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backText: { color: Colors.muted, fontSize: 15 },
  topBarTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, flex: 1, textAlign: 'center' },
  clipCounter: { fontSize: 13, color: Colors.muted, minWidth: 40, textAlign: 'right' },
  container: {
    paddingBottom: 40,
    alignItems: 'center',
    maxWidth: Colors.maxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  videoPlaceholder: {
    width: '100%',
    backgroundColor: '#050810',
    marginBottom: 16,
  },
  videoOverlay: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.primary}CC`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  playIcon: { fontSize: 24, color: Colors.white, marginLeft: 4 },
  videoMeta: { alignItems: 'center' },
  videoMetaText: { fontSize: 12, color: Colors.muted },
  videoMetaType: { fontSize: 14, fontWeight: '700', color: Colors.white, marginTop: 2 },
  timelineBar: { padding: 12 },
  timelineTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    position: 'relative',
    marginBottom: 4,
  },
  timelineProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  timelineThumb: {
    position: 'absolute',
    left: '40%',
    top: -5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  timelineLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  timelineLabel: { fontSize: 10, color: Colors.muted },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreItem: { alignItems: 'center', gap: 6 },
  scoreLabel: { fontSize: 12, color: Colors.muted, fontWeight: '600' },
  overallScore: { alignItems: 'center', gap: 4 },
  overallNum: { fontSize: 40, fontWeight: '800', color: Colors.white },
  overallLabel: { fontSize: 12, color: Colors.muted },
  outcomeBadge: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 4,
  },
  outcomeText: { fontSize: 12, fontWeight: '700' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  aiText: { fontSize: 14, color: Colors.muted, lineHeight: 22 },
  breakdownList: { gap: 12 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  breakdownAspect: { fontSize: 13, color: Colors.white, width: 100 },
  breakdownBarOuter: { flex: 1, height: 6, backgroundColor: Colors.background, borderRadius: 3, overflow: 'hidden' },
  breakdownBarInner: { height: '100%', borderRadius: 3 },
  breakdownScore: { fontSize: 14, fontWeight: '800', minWidth: 28, textAlign: 'right' },
  altSubtitle: { fontSize: 13, color: Colors.muted, marginTop: -6 },
  altRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 14,
  },
  altInfo: {},
  altLabel: { fontSize: 14, fontWeight: '600', color: Colors.white },
  altRating: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  altScore: { fontSize: 24, fontWeight: '800' },
  navRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 4,
  },
  navBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navBtnNext: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  navBtnDisabled: { opacity: 0.3 },
  navBtnText: { fontSize: 15, fontWeight: '600', color: Colors.muted },
  navBtnNextText: { color: Colors.white },
});
