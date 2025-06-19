import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../components/UserContext';
import { uploadImage } from '../src/api/pin'

export default function SolicitationDetail({ route }) {
  const { pin } = route.params;
  const { user } = useContext(AppContext);
  
  // Debug: verificar dados do pin
  console.log('Pin data:', pin);
  console.log('ImageUri:', pin.imageUri);

  return (
    <ScrollView style={styles.container}>
      {pin.imageUri && (
        <Image source={{ uri: pin.imageUri }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{pin.title}</Text>
        
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>{pin.desc}</Text>
        
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.date}>
          {new Date(pin.date).toLocaleDateString()}
        </Text>
        
        <Text style={styles.label}>Localização:</Text>
        <Text style={styles.description}>
          Lat: {pin.lati.toFixed(6)}, Long: {pin.long.toFixed(6)}
        </Text>
        
        <Text style={styles.label}>Direção da Bússola:</Text>
        <Text style={styles.description}>{pin.compassHeading}°</Text>
      </View>

      {/* Só mostra os botões se for admin */}
      {user.isAdm && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.deny]} onPress={() => {uploadImage(pin.id);}
          }>
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  content: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: 'green',
  },
  deny: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});