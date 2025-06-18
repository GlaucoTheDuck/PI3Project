import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppProvider } from './components/UserContext'; // import your context

import RequestListScreen from './screens/RequestListScreen';
import StartRequestScreen from './screens/StartRequestScreen';
import SolicitationDetail from './screens/SolicitationDetail';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="ListSolicitation" component={RequestListScreen} options={{ title: 'Lista de Solicitações' }} />
          <Stack.Screen name="SolicitationDetail" component={SolicitationDetail} options={({ route }) => ({ title: route.params?.solicitation?.title || 'Detalhes' })} />
          <Stack.Screen name="RegistObstrution" component={StartRequestScreen} options={{ title: 'Registro de Obstrução' }} />
          <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Mapa' }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Tela de Login' }} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Camera' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
