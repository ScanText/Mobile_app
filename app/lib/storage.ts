import AsyncStorage from '@react-native-async-storage/async-storage';

const PREMIUM_KEY = 'is_premium';

export async function setPremium() {
  await AsyncStorage.setItem(PREMIUM_KEY, 'true');
}

export async function isPremium(): Promise<boolean> {
  const value = await AsyncStorage.getItem(PREMIUM_KEY);
  return value === 'true';
}

export async function resetPremium() {
  await AsyncStorage.removeItem(PREMIUM_KEY);
}
