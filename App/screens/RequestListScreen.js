import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { AppContext } from '../components/UserContext';

export default function HomeScreen({ navigation }) {
  const { pins } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('SolicitationDetail', { pin: item })}
    >
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      ) : (
        <Image source={require('../assets/select-image-icon.png')} style={styles.itemImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description || 'Sem descrição'}
        </Text>
        <Text style={styles.locationText}>
          Lat: {item.lati?.toFixed(4)}, Long: {item.long?.toFixed(4)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('RegistObstrution')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});