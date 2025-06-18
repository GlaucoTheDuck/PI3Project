import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../components/UserContext';

export default function SolicitationDetail({ route }) {
  const { solicitation } = route.params;
  const { user } = useContext(AppContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: solicitation.imageUri }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{solicitation.title}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>{solicitation.description}</Text>
        <Text style={styles.label}>Data de Criação:</Text>
        <Text style={styles.date}>{new Date(solicitation.date).toLocaleString()}</Text>
      </View>

      {/* So mostra os botões se for admin */}
      {user.isAdm && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.accept]/*Não faz nada ainda*/}>
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deny]/*Não faz nada ainda*/}>
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
