import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const RECENT_GAMES = [
  { id: '1', title: 'vs. FC Barcelona', date: 'Feb 28', prob: 82, exec: 79, result: 'W 3-1' },
  { id: '2', title: 'vs. Real Madrid', date: 'Feb 21', prob: 71, exec: 74, result: 'D 1-1' },
  { id: '3', title: 'vs. Atletico', date: 'Feb 14', prob: 68, exec: 72, result: 'L 0-2' },
];

const QUICK_ACTIONS = [
  { icon: '⬆️', label: 'Upload', route: '/(tabs)/upload' },
  { icon: '🎯', label: 'Train', route: '/(tabs)/training' },
  { icon: '📊', label: 'Stats', route: '/(tabs)/history' },
  { icon: '👤', label: 'Profile', route: '/(tabs)/profile' },
];

function ScoreCircle({ score, label, color }: { score: number; label: string; color: string }) {
  return (
    <View style={scoreStyles.container}>
      <View style={[scoreStyles.circle, { borderColor: color }]}>
        <Text style={[scoreStyles.number, { color }]}>{score}</Text>
      </View>
      <Text style={scoreStyles.label}>{label}</Text>
    </View>
  );
}

const scoreStyles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  circle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  number: { fontSize: 26, fontWeight: '800' },
  label: { fontSize: 13, color: Colors.muted, fontWeight: '600', textAlign: 'center' },
});

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.playerName}>Marcus Johnson</Text>
          <Text style={styles.playerMeta}>CM · Semi-Pro · Age 22</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>MJ</Text>
        </View>
      </View>

      {/* Score Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Decision Score</Text>
        <Text style={styles.cardSubtitle}>Last 5 games average</Text>
        <View style={styles.scoresRow}>
          <ScoreCircle score={78} label="Probability" color={Colors.primary} />
          <View style={styles.scoreDivider} />
          <ScoreCircle score={74} label="Execution" color={Colors.orange} />
          <View style={styles.scoreDivider} />
          <ScoreCircle score={76} label="Overall" color="#7C3AED" />
        </View>
        <View style={styles.trendRow}>
          <Text style={styles.trendText}>📈 +3.2 pts vs. last month</Text>
        </View>
      </View>

      {/* Last Game */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Last Game</Text>
      </View>
      <TouchableOpacity
        style={[styles.card, styles.lastGameCard]}
        onPress={() => router.push('/decision-score')}
        activeOpacity={0.8}
      >
        <View style={styles.lastGameHeader}>
          <View>
            <Text style={styles.lastGameTitle}>vs. FC Barcelona</Text>
            <Text style={styles.lastGameDate}>Feb 28, 2026 · 24 clips analyzed</Text>
          </View>
          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>W 3-1</Text>
          </View>
        </View>
        <View style={styles.lastGameScores}>
          <View style={styles.miniScore}>
            <Text style={styles.miniScoreNum} numberOfLines={1}>82</Text>
            <Text style={styles.miniScoreLabel}>Prob</Text>
          </View>
          <View style={styles.miniScore}>
            <Text style={[styles.miniScoreNum, { color: Colors.orange }]}>79</Text>
            <Text style={styles.miniScoreLabel}>Exec</Text>
          </View>
        </View>
        <Text style={styles.viewDetails}>View decision breakdown →</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      <View style={styles.quickActionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={styles.quickActionBtn}
            onPress={() => router.push(action.route as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>{action.icon}</Text>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Games */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Games</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {RECENT_GAMES.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={styles.gameRow}
          onPress={() => router.push('/decision-score')}
          activeOpacity={0.8}
        >
          <View style={styles.gameIcon}>
            <Text style={{ fontSize: 20 }}>⚽</Text>
          </View>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDate}>{game.date}</Text>
          </View>
          <View style={styles.gameScores}>
            <Text style={styles.gameScore}>{game.prob}%</Text>
            <Text style={styles.gameScoreMuted}>prob</Text>
          </View>
          <Text style={styles.gameArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: {
    paddingTop: 56,
    paddingBottom: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  greeting: { fontSize: 14, color: Colors.muted, marginBottom: 2 },
  playerName: { fontSize: 22, fontWeight: '800', color: Colors.white },
  playerMeta: { fontSize: 13, color: Colors.muted, marginTop: 2 },
  avatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: Colors.maxWidth,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: Colors.muted, marginBottom: 20 },
  scoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  scoreDivider: { width: 1, height: 60, backgroundColor: Colors.border },
  trendRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  trendText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  lastGameCard: { marginBottom: 24 },
  lastGameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  lastGameTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  lastGameDate: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  resultBadge: {
    backgroundColor: `${Colors.primary}20`,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}40`,
  },
  resultText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  lastGameScores: { flexDirection: 'row', gap: 16, marginBottom: 14 },
  miniScore: { alignItems: 'center' },
  miniScoreNum: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  miniScoreLabel: { fontSize: 11, color: Colors.muted },
  viewDetails: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIcon: { fontSize: 22, marginBottom: 6 },
  quickActionLabel: { fontSize: 12, color: Colors.muted, fontWeight: '600' },
  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  gameIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameInfo: { flex: 1 },
  gameTitle: { fontSize: 14, fontWeight: '600', color: Colors.white },
  gameDate: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  gameScores: { alignItems: 'center' },
  gameScore: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  gameScoreMuted: { fontSize: 10, color: Colors.muted },
  gameArrow: { fontSize: 20, color: Colors.muted },
});
