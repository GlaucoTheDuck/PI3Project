import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

export default function SolicitationDetail({ route }) {
  const { solicitation } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image //imagem temporária
          source={require('../assets/select-image-icon.png')} 
          style={styles.image} 
          resizeMode='contain'/>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{solicitation.title}</Text>
        <Text style={styles.date}>{solicitation.date}</Text>
        <Text style={styles.description}>{solicitation.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    aspectRatio: 1, 
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});