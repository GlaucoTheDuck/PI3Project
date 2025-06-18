import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef, useState, useEffect } from "react";
import { getPins } from "../src/api/pin"

export default function SolicitationDetail() {
  
  const navigation = useNavigation();

  const mapRef = useRef(null);
  
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadMarkers() {
      try {
        const pins = await getPins();
        if (!isMounted) return;

        // Converte sua resposta no formato que o Map espera
        const markersList = pins.map(pin => ({
          title: pin.title,                 // ajuste se for outro campo
          latitude: pin.lati,
          longitude: pin.long,
        }));

        setMarkers(markersList);
      } catch (err) {
        console.error('Erro ao buscar pins:', err);
      }
    }

    loadMarkers();

    const intervalId = setInterval(loadMarkers, 5000);
    return () => { isMounted = false; clearInterval(intervalId); };
}, []);

  const dfBoundaries = {
    northEast: { latitude: -15.502233154575839, longitude: -47.30864855258083 },
    southWest: { latitude: -16.049527992387187, longitude: -48.28690285799649 },
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setMapBoundaries(
        dfBoundaries.northEast,
        dfBoundaries.southWest
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            
            latitude: -15.795987917284686,
            longitude: -47.887085271739814,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
          provider="google"
        >
          {markers.map((m, idx) => (
            <Marker
              key={m.id ?? idx}
              coordinate={{
                latitude: m.latitude,
                longitude: m.longitude
              }}
              pinColor={'red'}
              //title={m.title}
            />
          ))}
        </MapView>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>🚫</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>🚫</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>🚫</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ListSolicitation")}
        >
          <Text>📸</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "white",
  },
});
