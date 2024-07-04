import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyAudioBooks from "./screens/MyAudioBooks";
import MainScreen from "./screens/MainScreen";
import Settings from "./screens/Settings";
import AudioForm from "./screens/AudioForm";
import Generate from "./screens/Generate";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import NumberContextProvider from "./context/number-of-audios-context";
import AuthContextProvider, { AuthContext } from "./context/auth-context";

import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  function StacksNavigator() {
    const authCtx = useContext(AuthContext);
    return (
      <>
        {!authCtx.isAuthenticated && <AuthenticationStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </>
    );
  }

  function AuthenticationStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
            animationEnabled: true, // Enable default animations
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  function AuthenticatedStack() {
    return (
      <NumberContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Settings"
            screenOptions={{
              headerShown: false,
              animationEnabled: true, // Enable default animations
            }}
          >
            <Stack.Screen name="Audios" component={MyAudioBooks} />
            <Stack.Screen name="Menu" component={MainScreen} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AudioForm" component={AudioForm} />
            <Stack.Screen name="Generate" component={Generate} />
          </Stack.Navigator>
        </NavigationContainer>
      </NumberContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <StacksNavigator />
    </AuthContextProvider>
  );
}
