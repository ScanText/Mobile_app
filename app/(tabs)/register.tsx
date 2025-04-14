/*

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (password !== confirm) return alert('Пароли не совпадают!');
    // логика регистрации
    router.replace('/login');
  };

  return (
    <ImageBackground
              source={require('../../assets/images/map.png')} // фон можно заменить
              style={styles.container}
              resizeMode="cover"
            >
    <View style={styles.container}>
    <View style={styles.logoWrapper}>
     <Image
       source={require('../../assets/images/character.png')}
       style={styles.character}
       resizeMode="cover"
     />
     <Text style={styles.logoText}>ScanText</Text>
   </View>
        
          
        
      <Text style={styles.title}>📄 Регистрация</Text>
      <TextInput style={styles.input} placeholder="Имя пользователя" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Подтвердите пароль" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
     
    </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 34,
           borderRadius: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 20,
      textAlign: 'center',
      color: '#000',
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
      backgroundColor: '#5c6bc0',
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    link: {
      textAlign: 'center',
      marginTop: 14,
      color: '#5c6bc0',
      textDecorationLine: 'underline',
    },
    logoWrapper: {
        width: '100%',
        height: 100,
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 24,
        opacity: 0.60,
      },
      character: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
      },
      logoText: {
        position: 'absolute',
        top: '40%', // немного ниже середины
        left: '50%',
        transform: [{ translateX: -50 }],
        color: '#5c6bc0',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });


*/
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';





export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
  
    const handleRegister = () => {
      if (password !== confirm) return alert('Пароли не совпадают!');
      // логика регистрации
      router.replace('/login');
    };
  
    return (
    <>
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
    <Text style={styles.title}>📄 Регистрация</Text>
    <TextInput style={styles.input} placeholder="Имя пользователя" value={username} onChangeText={setUsername} />
    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
    <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
    <TextInput style={styles.input} placeholder="Подтвердите пароль" secureTextEntry value={confirm} onChangeText={setConfirm} />
    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>Зарегистрироваться</Text>
    </TouchableOpacity>
  </View>

  <TouchableOpacity onPress={() => router.replace('/login')}>
    <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
  </TouchableOpacity>
</View>
</ImageBackground>
</>
 );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'space-between', // 👈 разделит логотип, форму и ссылку
   //   backgroundColor: '#f5f5f5',
    },
    logo: {
      width: 180,
      height: 60,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 40,
    },
    form: {
      paddingVertical: 20,
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
      backgroundColor: '#5c6bc0',
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
    logoWrapper: {
        width: '100%',
        height: 100,
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 24,
        opacity: 0.60,
      },
      character: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
      },
      logoText: {
        position: 'absolute',
        top: '40%', // немного ниже середины
        left: '50%',
        transform: [{ translateX: -50 }],
        color: '#5c6bc0',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      wrapper: {
        flex: 1,
    },
  });