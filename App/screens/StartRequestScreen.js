import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../components/UserContext';

export default function StartRequestScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [compassHeading, setCompassHeading] = useState(null);
  const { solicitations, setSolicitations } = useContext(AppContext);
  const navigation = useNavigation();

  const handlePressImage = () => {
    navigation.navigate('CameraScreen', { onPhotoTaken: handlePhotoTaken });
  };

  const handlePhotoTaken = (photoUri, location, compassHeading) => {
    setImageUri(photoUri);
    setLocation(location);
    setCompassHeading(compassHeading);
  };

  const handleSubmit = () => {
    if (!title || !description || !imageUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e tire uma foto');
      return;
    }

    const newSolicitation = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toISOString(),
      imageUri, 
      location, 
      compassHeading, 
    };

    const updatedList = [...solicitations, newSolicitation];
    setSolicitations(updatedList);

    setTitle('');
    setDescription('');
    setImageUri(null); 
    setLocation(null); 
    setCompassHeading(null); 

    navigation.reset({
      index: 0,
      routes: [
        { name: 'MapScreen' },
        { name: 'ListSolicitation' },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardAvoiding}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={handlePressImage} style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image source={require('../assets/select-image-icon.png')} style={styles.image} />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.titleInput}
            placeholder="Digite o título..."
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.descriptionInput}
            multiline
            placeholder="Digite a descrição..."
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.buttonContainer}>
            <Button title="Enviar" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  titleInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  descriptionInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
});