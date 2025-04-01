import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
  ActivityIndicator, StyleSheet, ImageBackground
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import find_img from '../../assets/images/find_img.png';
import { incrementAttempts, isPremium } from '../lib/storage';
import bg from '../../assets/images/bg.png';

export default function HomeScreen() {
  const [image, setImage] = useState(null);
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
      setImage(result.assets[0].uri);
      await handleRecognize(result.assets[0].uri);
    }
  };

  const handleRecognize = async (imageUri) => {
    const premium = await isPremium();
    if (!premium) {
      const attempts = await incrementAttempts();
      if (attempts > 2) {
        router.push('/premium');
        return;
      }
    }

    recognizeText(imageUri);
  };

  const recognizeText = async (imageUri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
      const response = await fetch('https://fastapitext.fly.dev/extract-text/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      const data = await response.json();
      setText(data.text);
    } catch (error) {
      setText('Ошибка при распознавании текста');
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
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultText: {
    fontSize: 16,
    marginTop: 20,
    color: '#eee',
    textAlign: 'center',
  },
});
