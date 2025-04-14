import React from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import bg from '../../assets/images/sky.png';


export default function PremiumScreen() {
  const router = useRouter();

  const handlePayment = () => {
    const url = 'https://github.com/your-username/your-repo#premium'; // замени на свой URL
    Linking.openURL(url);

    // Переход на экран PIN через 5 секунд
    setTimeout(() => {
      router.push('/pin');
    }, 5000);
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.title}>💎 Premium-доступ</Text>

        <Text style={styles.desc}>
          Вы использовали 3 бесплатные попытки. Чтобы продолжить — активируйте подписку.
        </Text>

        <View style={styles.benefits}>
          <Text style={styles.benefit}>✔️ Неограниченное распознавание</Text>
          <Text style={styles.benefit}>⚡️ Ускоренная обработка</Text>
          <Text style={styles.benefit}>🧠 Доступ к ИИ-функциям</Text>
        </View>

        <Text style={styles.price}>20 USDT / месяц</Text>

        <Pressable style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Оплатить криптовалютой</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/pin')}>
          <Text style={styles.link}>Уже оплатил? Ввести PIN</Text>
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
 /* card: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },*/
  card: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  benefits: {
    marginBottom: 20,
  },
  benefit: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign:'center'
  },
  button: {
    backgroundColor:  '#4caf50',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    color: '#5c6bc0',
    marginBottom: 24,
    padding:10
  },
});
