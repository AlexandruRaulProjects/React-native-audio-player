import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import "filepond/dist/filepond.min.css";
import { storage } from "../db/firebase";

// import { db } from "../db/firebase";
import CustomFileUpload from "../components/CustomFileUpload";
// import Config from "react-native-config";

function Generate({ navigation }) {
  

  const [inputs, setInputs] = useState({
    name: {
      value: "",
      isValid: true,
    },
  });

  function cancelHandler() {
    navigation.navigate("Menu");
  }

  return (
    <CustomLinearGradient>
      <Text style={styles.pageTitleSS}>Process Content</Text>
      <View style={styles.inputsV}>
      </View>

      <View>
        <CustomFileUpload />
      </View>

      <View style={styles.buttonsV}>

        <CustomButton
          onPress={cancelHandler}
          iconName="back"
          buttonText=" Back"
        />
      </View>

      <StatusBar style="auto" />
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  rootSS: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  pageTitleSS: {
    color: "#F1F1F1",
    fontSize: 32,
    marginBottom: 48,
  },
  inputsV: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttonsV: {
    marginTop: 12,
    height: 95,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 12,
    marginBottom: 6,
  },
  buttonText: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

export default Generate;
