import { View, StyleSheet, Text } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from "../components/CustomButton";
import CustomDropdown from "../components/CustomDropdown";
import { AuthContext } from "../context/auth-context";
import { db } from "../db/firebase";
import { doc, updateDoc } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";

function Settings() {
  const typeOfSummary = [
    { label: "Scientific Paper", value: 0.3 },
    { label: "Media Article", value: 1.0 },
  ];

  const summarySize = [
    { label: "Simple", value: 128 },
    { label: "Extended", value: 512 },
  ];

  const language = [
    { label: "English", value: "english" },
    { label: "Romanian", value: "romanian" },
  ];

  const voices = [
    { label: "Voice 1", value: "alloy" },
    { label: "Voice 2", value: "echo" },
    { label: "Voice 3", value: "fable" },
    { label: "Voice 4", value: "onyx" },
    { label: "Voice 5", value: "nova" },
    { label: "Voice 6", value: "shimmer" },
  ];

  const labels = ["Document type", "Summary Size", "Language", "Voice"];

  const icons = ["book", "filetext1", "swap", "sound"];

  const navigation = useNavigation();
  const [selectedTypeOfSummary, setSelectedTypeOfSummary] = useState(null);
  const [selectedSummarySize, setSelectedSummarySize] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedVoices, setSelectedVoices] = useState(null);
  const authCtx = useContext(AuthContext);

  // const goBackHandler = () => {
  //   navigation.goBack();
  // };

  const handleSave = async () => {
    const settings = {
      typeOfSummary: selectedTypeOfSummary,
      size: selectedSummarySize,
      language: selectedLanguage,
      voice: selectedVoices,
    };
    const userId = authCtx.getProfile()["id"];
    const userRef = doc(db, "profiles", userId);

    try {
      await updateDoc(userRef, { settings: settings });
    } catch (e) {
      console.log(e);
    } finally {
      authCtx.redefineProfile(settings);
    }

    navigation.navigate("Menu");
  };

  return (
    <CustomLinearGradient>
      <Ionicons
        style={styles.settingsIconSS}
        name="settings"
        size={64}
        color="#F1F1F1"
      />
      <View style={styles.titleBox}>
        <Text style={styles.pageTitleSS}>Audio Generation Settings</Text>
      </View>

      <CustomDropdown
        data={typeOfSummary}
        labelName={labels[0]}
        iconName={icons[0]}
        value={selectedTypeOfSummary}
        onChange={setSelectedTypeOfSummary}
      />

      <CustomDropdown
        data={summarySize}
        labelName={labels[1]}
        iconName={icons[1]}
        value={selectedSummarySize}
        onChange={setSelectedSummarySize}
      />
      <CustomDropdown
        data={language}
        labelName={labels[2]}
        iconName={icons[2]}
        value={selectedLanguage}
        onChange={setSelectedLanguage}
      />
      <CustomDropdown
        data={voices}
        labelName={labels[3]}
        iconName={icons[3]}
        value={selectedVoices}
        onChange={setSelectedVoices}
      />

      <View style={styles.buttonsV}>
        <CustomButton
          buttonText={"Save"}
          iconName={"save"}
          onPress={handleSave}
          disabled={
            !selectedTypeOfSummary ||
            !selectedLanguage ||
            !selectedSummarySize ||
            !selectedVoices
          }
        />
        {/* <CustomButton
          buttonStyle={styles.back}
          buttonTextStyle={styles.backText}
          buttonText={"Back"}
          iconName={"back"}
          onPress={goBackHandler}
        /> */}
      </View>
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  audioDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 340,
    marginBottom: 12,
    backgroundColor: "#71498F",
    borderRadius: 4,
    paddingVertical: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#130045",
  },
  rootSS: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  pageTitleSS: {
    color: "#F1F1F1",
    fontSize: 32,
    marginBottom: 32,
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
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  settingsIconSS: {
    marginBottom: 48,
  },
});

export default Settings;
