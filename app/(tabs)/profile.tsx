import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '@/constants/Colors';

const RADAR_AXES = [
  { label: 'Passing', score: 78 },
  { label: 'Dribbling', score: 65 },
  { label: 'Press Res.', score: 63 },
  { label: 'Shooting', score: 70 },
  { label: 'Positioning', score: 82 },
  { label: 'Switching', score: 67 },
];

const TREND_DATA = [65, 68, 72, 70, 75, 74, 78, 76];

function RadarChart() {
  const size = 200;
  const center = size / 2;
  const radius = 75;
  const n = RADAR_AXES.length;

  const getPoint = (index: number, r: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const outerPoints = RADAR_AXES.map((_, i) => getPoint(i, radius));
  const dataPoints = RADAR_AXES.map((axis, i) => getPoint(i, (axis.score / 100) * radius));

  const outerPolygon = outerPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={radarStyles.container}>
      <Svg width={size} height={size}>
        {/* Background rings */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <Polygon
            key={i}
            points={outerPoints.map((p) => {
              const scaled = getPoint(RADAR_AXES.indexOf(RADAR_AXES[i] as any) >= 0 ? 0 : 0, radius * scale);
              const pts = RADAR_AXES.map((_, idx) => {
                const pt = getPoint(idx, radius * scale);
                return `${pt.x},${pt.y}`;
              });
              return pts.join(' ');
            }).join(' ')}
            fill="none"
            stroke={Colors.border}
            strokeWidth={1}
          />
        ))}
        {/* Actual ring using all axes */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => {
          const pts = RADAR_AXES.map((_, idx) => {
            const pt = getPoint(idx, radius * scale);
            return `${pt.x},${pt.y}`;
          });
          return (
            <Polygon
              key={`ring-${i}`}
              points={pts.join(' ')}
              fill="none"
              stroke={Colors.border}
              strokeWidth={1}
            />
          );
        })}
        {/* Axis lines */}
        {outerPoints.map((p, i) => (
          <Line
            key={`line-${i}`}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke={Colors.border}
            strokeWidth={1}
          />
        ))}
        {/* Data polygon */}
        <Polygon
          points={dataPolygon}
          fill={`${Colors.primary}30`}
          stroke={Colors.primary}
          strokeWidth={2}
        />
        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <Circle key={`dot-${i}`} cx={p.x} cy={p.y} r={4} fill={Colors.primary} />
        ))}
      </Svg>
      {/* Labels */}
      {RADAR_AXES.map((axis, i) => {
        const labelPoint = getPoint(i, radius + 22);
        return (
          <View
            key={`label-${i}`}
            style={[
              radarStyles.labelContainer,
              {
                position: 'absolute',
                left: labelPoint.x - 32,
                top: labelPoint.y - 12,
                width: 64,
              },
            ]}
          >
            <Text style={radarStyles.labelText}>{axis.label}</Text>
            <Text style={radarStyles.scoreText}>{axis.score}</Text>
          </View>
        );
      })}
    </View>
  );
}

const radarStyles = StyleSheet.create({
  container: { width: 200, height: 200, position: 'relative', marginBottom: 20 },
  labelContainer: { alignItems: 'center' },
  labelText: { fontSize: 9, color: Colors.muted, textAlign: 'center', fontWeight: '600' },
  scoreText: { fontSize: 11, color: Colors.primary, fontWeight: '800' },
});

function TrendLine() {
  const width = 280;
  const height = 60;
  const maxVal = Math.max(...TREND_DATA);
  const minVal = Math.min(...TREND_DATA);
  const range = maxVal - minVal || 1;

  const points = TREND_DATA.map((val, i) => ({
    x: (i / (TREND_DATA.length - 1)) * width,
    y: height - ((val - minVal) / range) * (height - 10) - 5,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <Svg width={width} height={height}>
      {/* Grid lines */}
      {[0, 0.5, 1].map((t, i) => (
        <Line
          key={i}
          x1={0}
          y1={height * (1 - t) - 5}
          x2={width}
          y2={height * (1 - t) - 5}
          stroke={Colors.border}
          strokeWidth={1}
        />
      ))}
      <Polygon
        points={`0,${height} ${polyline} ${width},${height}`}
        fill={`${Colors.primary}20`}
      />
      <Polygon
        points={polyline}
        fill="none"
        stroke={Colors.primary}
        strokeWidth={2.5}
      />
      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={3} fill={Colors.primary} />
      ))}
    </Svg>
  );
}

const INFO_ITEMS = [
  { label: 'Position', value: 'CM' },
  { label: 'Age', value: '22' },
  { label: 'Skill Level', value: 'Semi-Pro' },
  { label: 'Club', value: 'FC United' },
  { label: 'Games Analyzed', value: '12' },
  { label: 'Member Since', value: 'Jan 2026' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>MJ</Text>
        </View>
        <View>
          <Text style={styles.playerName}>Marcus Johnson</Text>
          <Text style={styles.playerSub}>CM · Semi-Pro · FC United</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>⭐ Level 4 Analyst</Text>
          </View>
        </View>
      </View>

      {/* Score Summary */}
      <View style={styles.scoreRow}>
        {[
          { label: 'Probability', score: 78, color: Colors.primary },
          { label: 'Execution', score: 74, color: Colors.orange },
          { label: 'Overall', score: 76, color: '#7C3AED' },
        ].map((item) => (
          <View key={item.label} style={styles.scoreItem}>
            <Text style={[styles.scoreNum, { color: item.color }]}>{item.score}</Text>
            <Text style={styles.scoreLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Radar Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Decision Radar</Text>
        <Text style={styles.cardSubtitle}>Across all decision types</Text>
        <View style={styles.radarContainer}>
          <RadarChart />
        </View>
      </View>

      {/* Trend Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Score Trend</Text>
        <Text style={styles.cardSubtitle}>Overall score — last 8 games</Text>
        <View style={styles.trendWrapper}>
          <TrendLine />
          <View style={styles.trendLabels}>
            <Text style={styles.trendMin}>{Math.min(...TREND_DATA)}</Text>
            <Text style={styles.trendMax}>{Math.max(...TREND_DATA)}</Text>
          </View>
        </View>
      </View>

      {/* Player Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Player Info</Text>
        <View style={styles.infoGrid}>
          {INFO_ITEMS.map((item) => (
            <View key={item.label} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsCard}>
        {[
          { icon: '✏️', label: 'Edit Profile' },
          { icon: '🔔', label: 'Notifications' },
          { icon: '💳', label: 'Subscription' },
          { icon: '🚪', label: 'Sign Out', danger: true },
        ].map((action) => (
          <TouchableOpacity key={action.label} style={styles.actionRow} activeOpacity={0.7}>
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={[styles.actionLabel, action.danger && styles.actionLabelDanger]}>
              {action.label}
            </Text>
            <Text style={styles.actionArrow}>›</Text>
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
    paddingHorizontal: 20,
    alignItems: 'center',
    maxWidth: Colors.maxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLargeText: { fontSize: 24, fontWeight: '800', color: Colors.white },
  playerName: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 },
  playerSub: { fontSize: 13, color: Colors.muted, marginBottom: 6 },
  levelBadge: {
    backgroundColor: `${Colors.orange}20`,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: `${Colors.orange}40`,
    alignSelf: 'flex-start',
  },
  levelBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.orange },
  scoreRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'space-around',
  },
  scoreItem: { alignItems: 'center' },
  scoreNum: { fontSize: 28, fontWeight: '800', marginBottom: 2 },
  scoreLabel: { fontSize: 11, color: Colors.muted, fontWeight: '600' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 2, alignSelf: 'flex-start' },
  cardSubtitle: { fontSize: 12, color: Colors.muted, marginBottom: 16, alignSelf: 'flex-start' },
  radarContainer: { alignItems: 'center', paddingTop: 10, paddingBottom: 20, minHeight: 240 },
  trendWrapper: { width: '100%', alignItems: 'center' },
  trendLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 4 },
  trendMin: { fontSize: 11, color: Colors.muted },
  trendMax: { fontSize: 11, color: Colors.primary },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, width: '100%' },
  infoItem: { width: '45%' },
  infoLabel: { fontSize: 11, color: Colors.muted, marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: Colors.white },
  actionsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionIcon: { fontSize: 20 },
  actionLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.white },
  actionLabelDanger: { color: '#FF4757' },
  actionArrow: { fontSize: 20, color: Colors.muted },
});
