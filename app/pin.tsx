import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Pressable, Alert, ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import bg from '../assets/images/bg.png';
import { setPremium } from './lib/storage';

// 💾 Жёстко зашитые PIN-коды
const validPins = [
  "J7F8-X9M1-Z3BQ-LK2N", "TR4P-LV8X-KD1Q-YG7A", "QW9Z-M2C3-XR8L-HJ5T",
  "AF3B-NX0T-PQ5K-ZL9R", "LM2P-V7QT-WX6N-BA3E", "XZ1K-LQ9M-NT7P-YU3D",
  "HJ5Q-KX8L-VTR3-NM1P", "PK2Y-Z7QT-HF6L-DR1X", "NF8X-YL2C-WT5Q-KM3Z",
  "DL7P-XT9K-VQ1Y-NC6B", "TY9K-WR3L-HX2P-BQ7Z", "MK6L-PX8C-ZN1T-YR2Q",
  "BR5X-VL7K-TQ9P-HC3N", "RC9Q-WT3Y-XM1L-PK7V", "KF2X-NL8Q-TR1P-ZW5C"
];

export default function PinScreen() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const normalized = pin.trim().toUpperCase();

    if (validPins.includes(normalized)) {
      await setPremium();
      Alert.alert('✅ Премиум активирован!');
      router.push('/'); // Возврат на главный экран
    } else {
      Alert.alert('❌ Неверный PIN');
    }
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.title}>🔑 Введите PIN-код</Text>

        <TextInput
          style={styles.input}
          placeholder="J7F8-X9M1-Z3BQ-LK2N"
          value={pin}
          onChangeText={setPin}
          placeholderTextColor="#aaa"
          autoCapitalize="characters"
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Активировать</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
