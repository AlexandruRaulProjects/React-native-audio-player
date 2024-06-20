import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

function CustomImageUpload({ selectedImage, setSelectedImage }) {
  const pickImage = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setSelectedImage(res.assets[0]);
    } catch (err) {
      if (ImagePicker.isCancel(err)) {
        Alert.alert("Canceled");
      } else {
        Alert.alert("Unknown Error: " + JSON.stringify(err));
      }
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>
          {selectedImage ? "Image Loaded" : "Load a profile picture"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    backgroundColor: "#F1F1F1",
    width: 200,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "rgba(117,29,124,1)",
    textAlign: "center",
    fontWeight: "800",
  },
  generatedText: {
    textAlign: "center",
    color: "rgba(117,29,124,1)",
    backgroundColor: "yellow",
    padding: 1,
    borderRadius: 3,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: 6,
  },
  uploadButton: {
    backgroundColor: "rgba(87,29,124,0.5)",
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomImageUpload;
