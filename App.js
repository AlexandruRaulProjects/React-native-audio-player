import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyAudioBooks from "./screens/MyAudioBooks";
import MainScreen from "./screens/MainScreen";
import LastPlayedAudios from "./screens/LastPlayedAudios";
import AudioForm from "./screens/AudioForm";
import Generate from "./screens/Generate";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import NumberContextProvider from "./context/number-of-audios-context";
import LastAudiosContextProvider from "./context/last-three-played";
import AudiosContextProvider from "./context/audios-context";
import AuthContextProvider, { AuthContext } from "./context/auth-context";

import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  function StacksNavigator() {
    const authCtx = useContext(AuthContext);
    return (
      <>
        {console.log(authCtx.isAuthenticated)}
        {!authCtx.isAuthenticated && <AuthenticationStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </>
    );
  }

  function AuthenticationStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  function AuthenticatedStack() {
    return (
      <AudiosContextProvider>
        <LastAudiosContextProvider>
          <NumberContextProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="AudioForm">
                <Stack.Screen name="Audios" component={MyAudioBooks} />
                <Stack.Screen name="Menu" component={MainScreen} />
                <Stack.Screen name="LastPlayed" component={LastPlayedAudios} />
                <Stack.Screen name="AudioForm" component={AudioForm} />
                {/* <Stack.Screen name="VoiceSettings" component={VoiceSettings} /> */}
                <Stack.Screen name="Generate" component={Generate} />
              </Stack.Navigator>
            </NavigationContainer>
          </NumberContextProvider>
        </LastAudiosContextProvider>
      </AudiosContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <StacksNavigator />
    </AuthContextProvider>
  );
}
