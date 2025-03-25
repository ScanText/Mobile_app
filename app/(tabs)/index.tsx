/*
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import find_img from '../../assets/images/find_img.png'

export default function HomeScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      recognizeText(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const testImage = async () => {
      const testUri = 'file:///storage/emulated/0/Download/photo.jpg';
      setImage(testUri);
      await recognizeText(testUri);
    };
  
    testImage();
  }, []);
  
  

  const recognizeText = async (imageUri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
      const response = await fetch('http://10.0.2.2:8000/extract-text/', {



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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📷 Распознавание текста с изображения</Text>

      <View style={styles.imagePlaceholder}>
        {image ? (
           <Image source={{ uri: image }} style={styles.image} />
         
        ) : (
    
          <Image  style={styles.img} source={find_img} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    margin: 24,
  },
  imagePlaceholder: {
    width: 280,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    // backgroundColor: '#eee', добавим светлый фон
    overflow: 'hidden',
  },
  image: {
    width: 280,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  placeholderText: {
    color: '#999',
  },
  button: {
    backgroundColor: '#585799',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  resultText: {
    fontSize: 16,
    marginTop: 24,
    color: '#333',
    textAlign: 'center',
  },
  img: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
*/
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import find_img from '../../assets/images/find_img.png';

export default function HomeScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPermissionAndLoad = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Разрешение нужно', 'Разрешите доступ к файлам для продолжения.');
        return;
      }

      const testUri = 'file:///storage/emulated/0/Download/photo.jpg'; // 👈 Проверь актуальный путь
      setImage(testUri);
      await recognizeText(testUri);
    };

    requestPermissionAndLoad();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Выбранный файл:', uri);
      setImage(uri);
      recognizeText(uri);
    }
  };

  const recognizeText = async (imageUri) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://10.0.2.2:8000/extract-text/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Ошибка:', error);
      setText('Ошибка при распознавании текста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📷 Распознавание текста с изображения</Text>

      <View style={styles.imagePlaceholder}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image style={styles.img} source={find_img} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    margin: 24,
  },
  imagePlaceholder: {
    width: 280,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: 280,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  resultText: {
    fontSize: 16,
    marginTop: 24,
    color: '#333',
    textAlign: 'center',
  },
  img: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#585799',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
