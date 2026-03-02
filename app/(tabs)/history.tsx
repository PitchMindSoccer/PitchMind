import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const GAMES = [
  { id: '1', title: 'vs. FC Barcelona', date: 'Feb 28', result: 'W 3-1', prob: 82, exec: 79, clips: 24, position: 'CM' },
  { id: '2', title: 'vs. Real Madrid', date: 'Feb 21', result: 'D 1-1', prob: 71, exec: 74, clips: 19, position: 'CM' },
  { id: '3', title: 'vs. Atletico', date: 'Feb 14', result: 'L 0-2', prob: 68, exec: 72, clips: 21, position: 'CM' },
  { id: '4', title: 'vs. Sevilla', date: 'Feb 7', result: 'W 2-0', prob: 80, exec: 77, clips: 22, position: 'CM' },
  { id: '5', title: 'vs. Valencia', date: 'Jan 31', result: 'W 4-1', prob: 86, exec: 83, clips: 28, position: 'CM' },
  { id: '6', title: 'vs. Villarreal', date: 'Jan 24', result: 'D 2-2', prob: 73, exec: 70, clips: 20, position: 'CM' },
  { id: '7', title: 'vs. Getafe', date: 'Jan 17', result: 'W 1-0', prob: 75, exec: 78, clips: 18, position: 'CM' },
];

const FILTERS = ['All', 'Wins', 'Draws', 'Losses'];

function getResultColor(result: string) {
  if (result.startsWith('W')) return Colors.primary;
  if (result.startsWith('D')) return Colors.orange;
  return Colors.danger ?? '#FF4757';
}

function getScoreColor(score: number) {
  if (score >= 80) return Colors.primary;
  if (score >= 70) return Colors.orange;
  return '#FF4757';
}

export default function HistoryScreen() {
  const [filter, setFilter] = useState('All');

  const filteredGames = GAMES.filter((g) => {
    if (filter === 'All') return true;
    if (filter === 'Wins') return g.result.startsWith('W');
    if (filter === 'Draws') return g.result.startsWith('D');
    if (filter === 'Losses') return g.result.startsWith('L');
    return true;
  });

  const avgProb = Math.round(filteredGames.reduce((s, g) => s + g.prob, 0) / filteredGames.length);
  const avgExec = Math.round(filteredGames.reduce((s, g) => s + g.exec, 0) / filteredGames.length);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Game History</Text>
        <Text style={styles.subtitle}>{GAMES.length} games analyzed</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{avgProb}</Text>
          <Text style={styles.summaryLabel}>Avg Probability</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: Colors.orange }]}>{avgExec}</Text>
          <Text style={styles.summaryLabel}>Avg Execution</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNum, { color: '#7C3AED' }]}>{filteredGames.length}</Text>
          <Text style={styles.summaryLabel}>Games</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filters}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Games List */}
      <View style={styles.gamesList}>
        {filteredGames.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.gameCard}
            onPress={() => router.push('/decision-score')}
            activeOpacity={0.8}
          >
            <View style={styles.gameCardLeft}>
              <View style={[styles.resultBadge, { backgroundColor: `${getResultColor(game.result)}20`, borderColor: `${getResultColor(game.result)}40` }]}>
                <Text style={[styles.resultText, { color: getResultColor(game.result) }]}>{game.result}</Text>
              </View>
              <View>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameMeta}>{game.date} · {game.clips} clips · {game.position}</Text>
              </View>
            </View>
            <View style={styles.gameCardRight}>
              <View style={styles.scoreCol}>
                <Text style={[styles.scoreNum, { color: getScoreColor(game.prob) }]}>{game.prob}</Text>
                <Text style={styles.scoreLabel}>Prob</Text>
              </View>
              <View style={styles.scoreCol}>
                <Text style={[styles.scoreNum, { color: getScoreColor(game.exec) }]}>{game.exec}</Text>
                <Text style={styles.scoreLabel}>Exec</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: {
    paddingTop: 56,
    paddingBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.muted },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: Colors.maxWidth,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryNum: { fontSize: 28, fontWeight: '800', color: Colors.primary, marginBottom: 4 },
  summaryLabel: { fontSize: 12, color: Colors.muted },
  summaryDivider: { width: 1, height: 40, backgroundColor: Colors.border },
  filtersScroll: { maxHeight: 50, marginBottom: 16 },
  filters: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 14, fontWeight: '600', color: Colors.muted },
  filterChipTextActive: { color: Colors.white },
  gamesList: {
    width: '100%',
    maxWidth: Colors.maxWidth,
    paddingHorizontal: 20,
    gap: 10,
  },
  gameCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  gameCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  resultBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 42,
  },
  resultText: { fontSize: 11, fontWeight: '800' },
  gameTitle: { fontSize: 14, fontWeight: '600', color: Colors.white, marginBottom: 2 },
  gameMeta: { fontSize: 11, color: Colors.muted },
  gameCardRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreCol: { alignItems: 'center' },
  scoreNum: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  scoreLabel: { fontSize: 10, color: Colors.muted },
  arrow: { fontSize: 20, color: Colors.muted },
});
