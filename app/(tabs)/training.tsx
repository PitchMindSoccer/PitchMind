import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const WEAK_AREAS = [
  {
    rank: 1,
    area: 'Through Ball Timing',
    score: 58,
    desc: 'You attempt through balls too early when runners are not yet in position.',
    drills: ['Shadow passing with movement cues', 'Decision gates drill', '2v2 through ball exercise'],
    improvement: '+8 pts possible',
  },
  {
    rank: 2,
    area: 'Press Resistance',
    score: 63,
    desc: 'Under high pressure, you lose the ball in dangerous zones 34% more than your position average.',
    drills: ['Rondo with press triggers', 'Back-to-goal shielding drill', 'Pressure turn sequence'],
    improvement: '+6 pts possible',
  },
  {
    rank: 3,
    area: 'Switching Play',
    score: 67,
    desc: 'Cross-field switches are often underhit or mistimed, missing the window to exploit space.',
    drills: ['Long switch accuracy circuit', 'Scanning before receiving', 'Wide overload drill'],
    improvement: '+5 pts possible',
  },
];

const GOALS = [
  { id: '1', label: 'Reach 80+ Probability Score', progress: 78, target: 80 },
  { id: '2', label: 'Improve Press Resistance to 75', progress: 63, target: 75 },
  { id: '3', label: 'Complete 10 Training Sessions', progress: 6, target: 10, isCount: true },
];

export default function TrainingScreen() {
  const [mode, setMode] = useState<'ai' | 'goal'>('ai');
  const [expandedArea, setExpandedArea] = useState<number | null>(0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Training</Text>
        <Text style={styles.subtitle}>Data-driven drills for your weak spots</Text>
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'ai' && styles.modeBtnActive]}
          onPress={() => setMode('ai')}
        >
          <Text style={styles.modeBtnIcon}>🤖</Text>
          <Text style={[styles.modeBtnText, mode === 'ai' && styles.modeBtnTextActive]}>
            AI Mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'goal' && styles.modeBtnActive]}
          onPress={() => setMode('goal')}
        >
          <Text style={styles.modeBtnIcon}>🎯</Text>
          <Text style={[styles.modeBtnText, mode === 'goal' && styles.modeBtnTextActive]}>
            Goal Mode
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'ai' ? (
        <>
          {/* AI Mode Banner */}
          <View style={styles.aiBanner}>
            <Text style={styles.aiBannerIcon}>🧠</Text>
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>AI-Selected Weak Areas</Text>
              <Text style={styles.aiBannerDesc}>
                Based on your last 5 games, these are your 3 most impactful areas to improve.
              </Text>
            </View>
          </View>

          {/* Weak Areas */}
          {WEAK_AREAS.map((area, i) => (
            <TouchableOpacity
              key={area.rank}
              style={[styles.areaCard, expandedArea === i && styles.areaCardExpanded]}
              onPress={() => setExpandedArea(expandedArea === i ? null : i)}
              activeOpacity={0.85}
            >
              <View style={styles.areaCardHeader}>
                <View style={styles.areaRank}>
                  <Text style={styles.areaRankText}>#{area.rank}</Text>
                </View>
                <View style={styles.areaInfo}>
                  <Text style={styles.areaTitle}>{area.area}</Text>
                  <View style={styles.areaScoreRow}>
                    <View style={styles.scorePill}>
                      <Text style={styles.scorePillText}>Score: {area.score}</Text>
                    </View>
                    <Text style={styles.areaImprovement}>{area.improvement}</Text>
                  </View>
                </View>
                <Text style={styles.expandArrow}>{expandedArea === i ? '▲' : '▼'}</Text>
              </View>

              {expandedArea === i && (
                <View style={styles.areaDetails}>
                  <Text style={styles.areaDesc}>{area.desc}</Text>
                  <Text style={styles.drillsTitle}>Recommended Drills:</Text>
                  {area.drills.map((drill, j) => (
                    <TouchableOpacity key={j} style={styles.drillRow}>
                      <Text style={styles.drillIcon}>▶</Text>
                      <Text style={styles.drillText}>{drill}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.startDrillBtn}>
                    <Text style={styles.startDrillBtnText}>Start Drill Session →</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          {/* Goal Mode */}
          <View style={styles.aiBanner}>
            <Text style={styles.aiBannerIcon}>🎯</Text>
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>Your Active Goals</Text>
              <Text style={styles.aiBannerDesc}>
                Track progress toward your personal targets.
              </Text>
            </View>
          </View>

          {GOALS.map((goal) => {
            const progress = goal.isCount
              ? (goal.progress / goal.target) * 100
              : ((goal.progress - 60) / (goal.target - 60)) * 100;
            const clampedProgress = Math.min(Math.max(progress, 0), 100);

            return (
              <View key={goal.id} style={styles.goalCard}>
                <Text style={styles.goalLabel}>{goal.label}</Text>
                <View style={styles.goalProgressRow}>
                  <View style={styles.goalBarOuter}>
                    <View style={[styles.goalBarInner, { width: `${clampedProgress}%` }]} />
                  </View>
                  <Text style={styles.goalProgressText}>
                    {goal.isCount ? `${goal.progress}/${goal.target}` : `${goal.progress}/${goal.target}`}
                  </Text>
                </View>
                <Text style={styles.goalPct}>{Math.round(clampedProgress)}% complete</Text>
              </View>
            );
          })}

          <TouchableOpacity style={styles.addGoalBtn}>
            <Text style={styles.addGoalBtnText}>+ Add New Goal</Text>
          </TouchableOpacity>
        </>
      )}
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
  header: { width: '100%', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.muted },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 4,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  modeBtnActive: { backgroundColor: Colors.primary },
  modeBtnIcon: { fontSize: 18 },
  modeBtnText: { fontSize: 15, fontWeight: '600', color: Colors.muted },
  modeBtnTextActive: { color: Colors.white },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
    gap: 12,
  },
  aiBannerIcon: { fontSize: 24 },
  aiBannerText: { flex: 1 },
  aiBannerTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  aiBannerDesc: { fontSize: 13, color: Colors.muted, lineHeight: 18 },
  areaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  areaCardExpanded: {
    borderColor: Colors.primary,
    backgroundColor: '#0D1F2D',
  },
  areaCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  areaRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaRankText: { fontSize: 14, fontWeight: '800', color: Colors.orange },
  areaInfo: { flex: 1 },
  areaTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 6 },
  areaScoreRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  scorePill: {
    backgroundColor: '#FF4757' + '20',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  scorePillText: { fontSize: 11, fontWeight: '700', color: '#FF4757' },
  areaImprovement: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  expandArrow: { fontSize: 12, color: Colors.muted },
  areaDetails: { marginTop: 16, gap: 12 },
  areaDesc: { fontSize: 14, color: Colors.muted, lineHeight: 20 },
  drillsTitle: { fontSize: 14, fontWeight: '700', color: Colors.white },
  drillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  drillIcon: { fontSize: 12, color: Colors.primary },
  drillText: { fontSize: 14, color: Colors.white, flex: 1 },
  startDrillBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startDrillBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  goalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  goalLabel: { fontSize: 15, fontWeight: '600', color: Colors.white },
  goalProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  goalBarOuter: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  goalBarInner: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  goalProgressText: { fontSize: 13, fontWeight: '700', color: Colors.primary, minWidth: 50, textAlign: 'right' },
  goalPct: { fontSize: 12, color: Colors.muted },
  addGoalBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    marginTop: 4,
  },
  addGoalBtnText: { fontSize: 15, fontWeight: '600', color: Colors.primary },
});
