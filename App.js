import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyAudioBooks from './screens/MyAudioBooks';
import MainScreen from './screens/MainScreen';
import LastPlayedAudios from './screens/LastPlayedAudios';
import AudioForm from './screens/AudioForm';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';


import NumberContextProvider from './context/number-of-audios-context';
import LastAudiosContextProvider from './context/last-three-played';
import AudiosContextProvider from './context/audios-context';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AudiosContextProvider>
      <LastAudiosContextProvider>
        <NumberContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUp'>
              <Stack.Screen name="Audios" component={MyAudioBooks} />
              <Stack.Screen name="Menu" component={MainScreen} />
              <Stack.Screen name="LastPlayed" component={LastPlayedAudios} />
              <Stack.Screen name="AudioForm" component={AudioForm} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          </NavigationContainer>
        </NumberContextProvider>
      </LastAudiosContextProvider>
    </AudiosContextProvider>
  );
}


