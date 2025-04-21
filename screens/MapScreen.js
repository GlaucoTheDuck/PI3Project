import { WebView } from 'react-native-webview'; // Não use o import do react-native
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const htmlContent = `
<!DOCTYPE html>
<html>
  <body>
    <div id="map" style="height:100vh"></div>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
      var map = L.map('map').setView([-15.7942, -47.8825], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      // Adicione marcadores
      L.marker([-15.7942, -47.8825])
       .addTo(map)
       .bindPopup("Táxi 01");
    </script>
  </body>
</html>
`;

export default function SolicitationDetail() {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.map}
        />
  
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
  
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistObstrution')}>
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
    map: {
      flex: 1,
    },
    buttonsContainer: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingVertical: 10,
    },
    button: {
      padding: 15,
      borderRadius: 30,
      backgroundColor: 'white',
    },
  });