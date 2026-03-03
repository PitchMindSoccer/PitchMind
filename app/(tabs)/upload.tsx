import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export default function UploadScreen() {
  const [uploadState, setUploadState] = useState<'idle' | 'selected' | 'uploading' | 'done'>('idle');
  const [fileName, setFileName] = useState('');

  const handleSelectVideo = () => {
    setFileName('match_vs_barcelona_02282026.mp4');
    setUploadState('selected');
  };

  const handleStartUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('done');
    }, 2000);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Upload Game</Text>
        <Text style={styles.subtitle}>Let AI analyze your decisions in minutes</Text>
      </View>

      {/* Upload Area */}
      <TouchableOpacity
        style={[
          styles.uploadArea,
          uploadState === 'selected' && styles.uploadAreaSelected,
          uploadState === 'done' && styles.uploadAreaDone,
        ]}
        onPress={uploadState === 'idle' ? handleSelectVideo : undefined}
        activeOpacity={0.8}
      >
        {uploadState === 'idle' && (
          <>
            <Text style={styles.uploadIcon}>📁</Text>
            <Text style={styles.uploadTitle}>Select Video File</Text>
            <Text style={styles.uploadDesc}>
              Tap to browse your library{'\n'}MP4, MOV, AVI supported
            </Text>
            <View style={styles.uploadBadge}>
              <Text style={styles.uploadBadgeText}>Up to 10GB</Text>
            </View>
          </>
        )}

        {uploadState === 'selected' && (
          <>
            <Text style={styles.uploadIcon}>🎬</Text>
            <Text style={styles.uploadTitle}>Video Selected</Text>
            <Text style={styles.fileName} numberOfLines={1}>{fileName}</Text>
            <TouchableOpacity onPress={handleSelectVideo}>
              <Text style={styles.changeFile}>Change file</Text>
            </TouchableOpacity>
          </>
        )}

        {uploadState === 'uploading' && (
          <>
            <Text style={styles.uploadIcon}>⏳</Text>
            <Text style={styles.uploadTitle}>Uploading...</Text>
            <View style={styles.progressBarOuter}>
              <View style={styles.progressBarInner} />
            </View>
            <Text style={styles.uploadDesc}>AI is processing your footage</Text>
          </>
        )}

        {uploadState === 'done' && (
          <>
            <Text style={styles.uploadIcon}>✅</Text>
            <Text style={[styles.uploadTitle, { color: Colors.primary }]}>Upload Complete!</Text>
            <Text style={styles.uploadDesc}>Analysis will be ready in ~5 minutes</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Game Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Game Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Opposition</Text>
          <Text style={styles.detailValue}>FC Barcelona</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>Feb 28, 2026</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Position Played</Text>
          <Text style={styles.detailValue}>CM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>90 min</Text>
        </View>
      </View>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>📸 Tips for Best Results</Text>
        {[
          'Film from an elevated angle (stands or raised position)',
          'Ensure your full body is visible in most frames',
          'Good lighting improves AI accuracy by 20%+',
          'At least 30 minutes of footage recommended',
        ].map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <Text style={styles.tipDot}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Start Upload Button */}
      {(uploadState === 'selected') && (
        <TouchableOpacity style={styles.startBtn} onPress={handleStartUpload} activeOpacity={0.85}>
          <Text style={styles.startBtnText}>⬆️  Start Upload →</Text>
        </TouchableOpacity>
      )}

      {uploadState === 'idle' && (
        <TouchableOpacity style={styles.selectBtn} onPress={handleSelectVideo} activeOpacity={0.85}>
          <Text style={styles.selectBtnText}>📁  Select Video</Text>
        </TouchableOpacity>
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
  header: { width: '100%', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  subtitle: { fontSize: 15, color: Colors.muted },
  uploadArea: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 10,
  },
  uploadAreaSelected: {
    borderColor: Colors.primary,
    borderStyle: 'solid',
    backgroundColor: `${Colors.primary}10`,
  },
  uploadAreaDone: {
    borderColor: Colors.primary,
    borderStyle: 'solid',
    backgroundColor: `${Colors.primary}08`,
  },
  uploadIcon: { fontSize: 48, marginBottom: 4 },
  uploadTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  uploadDesc: { fontSize: 14, color: Colors.muted, textAlign: 'center', lineHeight: 22 },
  uploadBadge: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  uploadBadgeText: { fontSize: 12, color: Colors.muted },
  fileName: { fontSize: 14, color: Colors.primary, fontWeight: '600', maxWidth: '80%' },
  changeFile: { fontSize: 13, color: Colors.muted, textDecorationLine: 'underline' },
  progressBarOuter: {
    width: '80%',
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarInner: {
    width: '65%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
  },
  detailsTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: 14, color: Colors.muted },
  detailValue: { fontSize: 14, fontWeight: '600', color: Colors.white },
  tipsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  tipsTitle: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  tipRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  tipDot: { color: Colors.primary, fontSize: 16, lineHeight: 20 },
  tipText: { fontSize: 13, color: Colors.muted, flex: 1, lineHeight: 20 },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  startBtnText: { fontSize: 17, fontWeight: '700', color: Colors.white },
  selectBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectBtnText: { fontSize: 16, fontWeight: '600', color: Colors.white },
});
