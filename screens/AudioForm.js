import { useContext, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";

import Input from "../components/Input";
import { AuthContext } from "../context/auth-context";

import { db } from "../db/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import uuid from "react-native-uuid";

function AudioForm({ navigation }) {
  const [inputs, setInputs] = useState({
    name: {
      value: "",
      isValid: true,
    },
    author: {
      value: "",
      isValid: true,
    },
  });

  const authCtx = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [audio, setAudio] = useState(null);

  const updateAudiosDb = async (audioData, id) => {
    console.log(audioData);

    try {
      const audiosRef = doc(db, `profiles`, id);

      const u = uuid.v4();

      await updateDoc(audiosRef, {
        audios: arrayUnion({ ...audioData, id: u }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  let formIsValid;

  async function sendValidatedInputs(audioData) {
    audioData = { ...audioData, ...audio };
    console.log(audioData);

    const nameIsValid = audioData.name.length > 1;
    const authorIsValid = audioData.author.length > 3;
    formIsValid = nameIsValid && authorIsValid;

    if (!formIsValid) {
      Alert.alert("Invalid input!", "Please check your input values!");
      setInputs((currentInputs) => {
        return {
          name: { value: currentInputs.name.value, isValid: nameIsValid },
          author: { value: currentInputs.author.value, isValid: authorIsValid },
        };
      });
    }
    if (formIsValid) {
      navigation.navigate("Menu");
      const id = authCtx.getProfile()["id"];
      await updateAudiosDb(audioData, id);
    }
  }

  function addAudioHandler() {
    const audioData = {
      name: inputs.name.value,
      author: inputs.author.value,
    };

    sendValidatedInputs(audioData);
  }

  function cancelHandler() {
    navigation.navigate("Menu");
  }

  return (
    <CustomLinearGradient>
      <Text style={styles.pageTitleSS}>Audio</Text>
      <View style={styles.inputsV}>
        <Input
          label="Name"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
        />
        <Input
          label="Author"
          invalid={!inputs.author.isValid}
          textInputConfig={{
            autoCapitalize: "words",
            onChangeText: inputChangeHandler.bind(this, "author"),
            value: inputs.author.value,
          }}
        />
      </View>

      <View>
        <CustomFileUpload
          audio={audio}
          setAudio={setAudio}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          uploading={uploading}
          setUploading={setUploading}
          style={styles.centerContent}
        />
      </View>

      <View style={styles.buttonsV}>
        <CustomButton
          style={styles.button}
          iconName={"pluscircleo"}
          buttonText={"Add"}
          onPress={addAudioHandler}
        />

        <CustomButton
          style={styles.button}
          iconName={"minuscircleo"}
          buttonText={"Cancel"}
          onPress={cancelHandler}
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
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default AudioForm;
