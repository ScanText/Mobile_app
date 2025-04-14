import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
  ActivityIndicator, StyleSheet, ImageBackground, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as mime from 'react-native-mime-types'; // обязательно!
import find_img from '../../assets/images/find_img.png';
//import { isPremium } from '../lib/storage';
import bg from '../../assets/images/character.png';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Выбрано изображение:', uri);
      setImage(uri);
      await recognizeText(uri);;
    }
  };

  /*const handleRecognize = async (imageUri: string) => {
    const premium = await isPremium?.();
    if (!premium) {
      const attempts = await incrementAttempts?.();
      if (attempts > 2) {
        router.push('/premium');
        return;
      }
    }
    recognizeText(imageUri);
  };
*/
  const recognizeText = async (imageUri: string) => {
    setLoading(true);
    try {
      const fileType = mime.lookup(imageUri) || 'image/jpeg';

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: fileType,
      } as any); // important!

      const response = await fetch('https://fastapitext.fly.dev/extract-text/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('✅ Ответ от сервера:', data);
      setText(data.text);
    } catch (error) {
      console.error('❌ Ошибка при распознавании:', error);
      Alert.alert('Ошибка', 'Не удалось распознать текст. Проверь подключение.');
      setText('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.title}>📷 Распознавание текста</Text>

        <View style={styles.imagePlaceholder}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={find_img} style={styles.img} />
          )}
        </View>

        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Выбрать изображение</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        ) : (
          text !== '' && <Text style={styles.resultText}>{text}</Text>
        )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
/*
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
  },*/
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 260,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: 260,
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  img: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
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
  resultText: {
    fontSize: 16,
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
  },
});
