import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AUDIOS } from "../data/dummy-data";

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from "../components/CustomButton";
import { NumberContext } from "../context/number-of-audios-context";
import { AuthContext } from "../context/auth-context";

const menuItems = [
  {
    iconName: "history",
    title: " History",
    navigateTo: "LastPlayed",
  },

  {
    iconName: "library-books",
    title: " Audio Books",
    navigateTo: "Audios",
  },

  {
    iconName: "add-circle",
    title: " Add new audio book",
    navigateTo: "AudioForm",
  },

  {
    iconName: "settings",
    title: " Voice Settings",
    navigateTo: "VoiceSettings",
  },

  {
    iconName: "file-copy",
    title: " Generate",
    navigateTo: "Generate",
  },
];

function MainScreen({ navigation }) {
  const audiosNumberContext = useContext(NumberContext);
  const authCtx = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function extractNumberOfAudios() {
    return (audiosNumberContext.numberOfAudios = AUDIOS.length);
  }

  function goToScreenHandler(screenName) {
    navigation.navigate(screenName);
  }

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <CustomLinearGradient>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.outlineProfileBox}>
          <View style={styles.profileBox}>
            <Image
              source={{ uri: authCtx.getProfile()["image"] }}
              style={styles.image}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
            <View style={styles.profileTexts}>
              <Text style={styles.fullName}>
                {authCtx.getProfile()["fullname"]}
              </Text>
              <Text style={styles.email}>{authCtx.getProfile()["email"]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Menu</Text>
          <View style={styles.menuOptions}>
            {menuItems.map((menuItem) => (
              <Pressable
                key={menuItem.title}
                onPress={goToScreenHandler.bind(this, menuItem.navigateTo)}
                android_ripple={{ color: "rgba(117,29,124,0.2)" }}
              >
                <View style={styles.menuItem}>
                  <View>
                    <MaterialIcons
                      name={menuItem.iconName}
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text style={styles.menuItem}>{menuItem.title}</Text>
                  {menuItem.title === " Audio Books" && (
                    <Text style={styles.numberOfBooks}>
                      {extractNumberOfAudios()}
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <CustomButton
          iconName="logout"
          buttonText=" Logout"
          onPress={logoutHandler}
        />
      </View>
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "#F1F1F1",
    marginTop: 40,
  },
  outlineProfileBox: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#F1F1F1",
    borderWidth: 4,
    borderRadius: 8,
    padding: 0,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#f0e68c",
    borderRadius: 2,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  image: {
    marginRight: 48,
  },
  fullName: {
    color: "violet",
  },
  email: {
    color: "#F1F1F1",
  },
  menu: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuOptions: {
    marginRight: 60,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "400",
    color: "#F1F1F1",
    marginTop: 32,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#F1F1F1",
    width: 200,
    marginVertical: 12,
  },
  numberOfBooks: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    borderRadius: 40,
    marginRight: 12,
    borderColor: "white",
    borderWidth: 2,
  },
});

export default MainScreen;
