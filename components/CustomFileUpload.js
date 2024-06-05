import { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import OpenAI from "openai";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { PDFDocument } from "pdf-lib";
import { storage } from "../db/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function CustomFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const openai = new OpenAI({
    apiKey: "openai-api-key",
  });

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      console.log(res);

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
            //LINE C
            console.log("File available at", downloadURL);
            isUploadCompleted(true);
            return downloadURL;
          });
        }
      );
      console.log(selectedFile.assets[0].uri);
      const fileContent = await FileSystem.readAsStringAsync(
        selectedFile.assets[0].uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      const pdfDoc = await PDFDocument.load(fileContent);

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Provide a summary of maximum 200 words about the content of this file.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0]);

      setUploading(false);
      Alert.alert("File uploaded", "Your file has been uploaded successfully!");
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
        <Text style={styles.buttonText}>Upload a file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedFile ? styles.uploadButton : styles.disabledButton}
        onPress={selectedFile ? uploadFile : null}
        disabled={!selectedFile || uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Upload"}
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
