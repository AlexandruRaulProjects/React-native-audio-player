import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyAudioBooks from './screens/MyAudioBooks';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Audios'>
        <Stack.Screen name="Audios" component={MyAudioBooks} />
        <Stack.Screen name="Menu" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


