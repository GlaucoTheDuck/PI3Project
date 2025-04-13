import React, { useState } from 'react';
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

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const navigation = useNavigation();

  const handlePressImage = () => {
    Alert.alert('Imagem clicada!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={handlePressImage} style={styles.imageContainer}>
            <Image
              source={require('../assets/select-image-icon.png')}
              style={styles.image}
            />
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
            <Button
              title="Enviar"
              onPress={() => navigation.navigate('ListSolicitation')}
            />
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
