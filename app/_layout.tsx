import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="account-type" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="player-profile-setup" />
        <Stack.Screen name="all-set" />
        <Stack.Screen name="pricing" />
        <Stack.Screen name="walkthrough" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="decision-score" />
        <Stack.Screen name="clip-detail" />
      </Stack>
    </GestureHandlerRootView>
  );
}
