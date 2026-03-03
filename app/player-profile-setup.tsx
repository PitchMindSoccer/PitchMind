import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const POSITIONS = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];
const SKILL_LEVELS = ['Beginner', 'Amateur', 'Semi-Pro', 'Professional'];

export default function PlayerProfileSetupScreen() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [positionModalVisible, setPositionModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);

  const isComplete = name && position && age && skillLevel;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>Tell us about yourself so AI can personalize your analysis</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 4</Text>

          <View style={styles.form}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Marcus Johnson"
                placeholderTextColor={Colors.muted}
                autoCapitalize="words"
              />
            </View>

            {/* Position */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Position</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setPositionModalVisible(true)}
              >
                <Text style={[styles.dropdownText, !position && styles.dropdownPlaceholder]}>
                  {position || 'Select your position'}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Age */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="e.g. 22"
                placeholderTextColor={Colors.muted}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            {/* Skill Level */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Skill Level</Text>
              <View style={styles.skillButtons}>
                {SKILL_LEVELS.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.skillBtn,
                      skillLevel === level && styles.skillBtnSelected,
                    ]}
                    onPress={() => setSkillLevel(level)}
                  >
                    <Text
                      style={[
                        styles.skillBtnText,
                        skillLevel === level && styles.skillBtnTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.continueBtn, !isComplete && styles.continueBtnDisabled]}
            onPress={() => isComplete && router.push('/all-set')}
            disabled={!isComplete}
          >
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Position Modal */}
      <Modal
        visible={positionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPositionModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setPositionModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Position</Text>
            <FlatList
              data={POSITIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, position === item && styles.modalItemSelected]}
                  onPress={() => {
                    setPosition(item);
                    setPositionModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalItemText, position === item && styles.modalItemTextSelected]}>
                    {item}
                  </Text>
                  {position === item && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
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
  header: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.white, marginBottom: 8 },
  subtitle: { fontSize: 15, color: Colors.muted, lineHeight: 22 },
  progressBar: {
    height: 4,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressText: { fontSize: 12, color: Colors.muted, marginBottom: 28 },
  form: { gap: 20, marginBottom: 32 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.muted },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    fontSize: 16,
    color: Colors.white,
  },
  dropdown: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: { fontSize: 16, color: Colors.white },
  dropdownPlaceholder: { color: Colors.muted },
  dropdownArrow: { color: Colors.muted, fontSize: 12 },
  skillButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  skillBtnSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}20`,
  },
  skillBtnText: { fontSize: 14, color: Colors.muted, fontWeight: '600' },
  skillBtnTextSelected: { color: Colors.primary },
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
  continueBtnDisabled: { opacity: 0.4 },
  continueBtnText: { fontSize: 17, fontWeight: '700', color: Colors.white },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalItemSelected: { backgroundColor: `${Colors.primary}10` },
  modalItemText: { fontSize: 16, color: Colors.white },
  modalItemTextSelected: { color: Colors.primary, fontWeight: '700' },
  checkmark: { color: Colors.primary, fontSize: 18 },
});
