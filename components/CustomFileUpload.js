import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../db/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function CustomFileUpload({
  audio,
  setAudio,
  selectedFile,
  setSelectedFile,
  uploading,
  setUploading,
}) {
  const authCtx = useContext(AuthContext);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Canceled");
      } else {
        Alert.alert("Unknown Error: " + JSON.stringify(err));
      }
    }
  };

  const uploadFile = async () => {
    setUploading(true);

    try {
      const res = await fetch(selectedFile.assets[0].uri);
      const blobFile = await res.blob();

      if (!blobFile) return;
      const storageRef = ref(
        storage,
        `unprocessed_files/${selectedFile.assets[0].name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, blobFile);
      uploadTask.on(
        "state_changed",
        null,
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            return downloadURL;
          });
        }
      );

      const fileDetails = {
        mimeType: selectedFile.assets[0].mimeType,
        name: selectedFile.assets[0].name,
        size: selectedFile.assets[0].size,
        uri: selectedFile.assets[0].uri,
      };

      const settings = authCtx.getProfile()["settings"];

      // Notify backend to finalize the processing
      // const response = await axios.post(
      //   "file-reader-app-1dp6.vercel.app/finalize",
      //   {
      //     fileDetails: fileDetails,
      //   }
      // );

      axios
        .post("http://192.168.0.104:3005/finalize", {
          fileDetails: fileDetails,
          settings: settings,
        })
        .then((response) => {
          setAudio(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      Alert.alert("Response from server:", "OK");

      setUploading(false);
      setSelectedFile(null);
    } catch (e) {
      console.error(e);
      setUploading(false);
      Alert.alert(
        "Upload failed",
        "An error occurred while uploading the file."
      );
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.selectButton} onPress={pickDocument}>
        <Text style={styles.buttonText}>
          {selectedFile ? "File Loaded" : "Load a file"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedFile ? styles.uploadButton : styles.disabledButton}
        onPress={selectedFile ? uploadFile : null}
        disabled={!selectedFile || uploading}
      >
        <Text style={styles.buttonText}>
          {selectedFile ? "Uploading..." : "Upload"}
        </Text>
      </TouchableOpacity>
      {uploading && <Text style={styles.generatedText}>Generating...</Text>}
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
    backgroundColor: "rgba(117,29,124,1)",
    width: 150,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
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

export default CustomFileUpload;
