import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // логика авторизации
    // router.replace('/home');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/map.png')}
      style={styles.wrapper}
      resizeMode="cover"
    >
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/character.png')}
          style={styles.character}
          resizeMode="cover"
        />
        <Text style={styles.logoText}>ScanText</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>🔐 Вход в аккаунт</Text>
          <TextInput style={styles.input} placeholder="Логин" onChangeText={setLogin} value={login} />
          <TextInput style={styles.input} placeholder="Пароль" secureTextEntry onChangeText={setPassword} value={password} />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Нет аккаунта? Зарегистрируйтесь</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 24,
    opacity: 0.6,
  },
  character: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  logoText: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -50 }],
    color: '#5c6bc0',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    paddingVertical: 20,
    paddingTop:80
    
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
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
  },
});
