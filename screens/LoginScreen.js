import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../components/UserContext';

export default function LoginScreen() {
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigation();

  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = () => {
    if (nameInput.trim() === '') return;
    setUser({ ...user, name: nameInput });
    navigation.navigate('MapScreen');
  };

  const toggleAdmin = () => {
    setUser(prev => ({ ...prev, isAdm: !prev.isAdm }));
  };

  return (
    <View style={styles.container}>
      {/* Invisible clickable area in the top-right corner */}
      <TouchableOpacity style={styles.invisibleButton} onPress={toggleAdmin} />

      <Text style={styles.title}>Tela de Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nameInput}
        onChangeText={setNameInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={passwordInput}
        onChangeText={setPasswordInput}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  invisibleButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
    //backgroundColor: 'red', // descomentar essa linha para ver o botão
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,  
    textAlign: 'center',
  },
});