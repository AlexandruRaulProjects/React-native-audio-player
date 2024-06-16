import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useState, useContext } from "react";

import CustomLinearGradient from "../components/CustomLinearGradient";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/LoadingOverlay";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import { storage } from "../db/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { AuthContext } from "../context/auth-context";
import CustomImageUpload from "../components/CustomImageUpload";

function SignUp({ navigation }) {
  const [inputs, setInputs] = useState({
    username: {
      value: "",
      isValid: true,
    },
    fullname: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    image: {
      value: "",
      isValid: true,
    },
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [downloadUrl, setDownloadUrl] = useState("");

  const authCtx = useContext(AuthContext);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  async function sendValidatedInputs(signUpData) {
    const usernameIsValid = signUpData.username.length > 4;
    const fullnameIsValid = signUpData.fullname.length > 4;
    const emailIsValid = signUpData.email.includes("@");
    const passwordIsValid = signUpData.password.length > 6;
    const imageIsValid = signUpData.image !== null;

    formIsValid =
      usernameIsValid &&
      fullnameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      imageIsValid;

    if (!formIsValid) {
      //TODO: show some feedback
      //Alert.alert('Invalid input!', 'Please check your input values!');
      setInputs((currentInputs) => {
        return {
          username: {
            value: currentInputs.username.value,
            isValid: usernameIsValid,
          },
          fullname: {
            value: currentInputs.fullname.value,
            isValid: fullnameIsValid,
          },
          email: { value: currentInputs.email.value, isValid: emailIsValid },
          password: {
            value: currentInputs.password.value,
            isValid: passwordIsValid,
          },
        };
      });
    }
    if (formIsValid) {
      setIsAuthenticating(true);
      try {
        const { token, userId } = await createUser(
          signUpData.email,
          signUpData.password
        );

        setIsCreatingProfile(true);

        try {
          const res = await fetch(selectedImage.uri);
          const blobFile = await res.blob();

          if (!blobFile) return;
          const storageRef = ref(
            storage,
            `profile_images/${userId}/${selectedImage.fileName}`
          );
          const uploadTask = uploadBytesResumable(storageRef, blobFile);

          uploadTask.on(
            "state_changed",
            null,
            (error) => console.log(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              setDownloadUrl(downloadURL);

              // Proceed with profile creation after download URL is obtained
              const docRef = doc(db, "profiles", userId);
              const profileData = {
                id: userId,
                username: signUpData.username,
                fullname: signUpData.fullname,
                email: signUpData.email,
                image: downloadURL,
              };

              try {
                await setDoc(docRef, profileData);
              } catch (error) {
                Alert.alert(
                  "Profile creation failed!",
                  "Could not create a new profile!"
                );
              }

              setIsAuthenticating(false);

              let docSnapshot;

              try {
                docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                  console.log("Document data:", docSnapshot.data());
                } else {
                  console.log("No such document!");
                }
              } catch (error) {
                Alert.alert(
                  "Profile retrieval failed!",
                  "Could not retrieve a new profile!"
                );
              }

              let profile = docSnapshot.data();

              authCtx.authenticate(token, profile);
            }
          );
        } catch (e) {
          console.error(e);
          setUploading(false);
          Alert.alert(
            "Upload failed",
            "An error occurred while uploading the file."
          );
        }
      } catch (error) {
        Alert.alert(
          "Authentication failed!",
          "Could not create a new user. Check your inputs or come back later!"
        );
      }
      setIsAuthenticating(false);
    }
  }

  async function signUpHandler() {
    const signUpData = {
      username: inputs.username.value,
      fullname: inputs.fullname.value,
      email: inputs.email.value,
      password: inputs.password.value,
      image: selectedImage,
    };

    await sendValidatedInputs(signUpData);
    //TODO: Sign Up implementation
  }

  function signInHandler() {
    navigation.navigate("SignIn");
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  if (isCreatingProfile) {
    return <LoadingOverlay message={"Creating profile..."} />;
  }

  return (
    <CustomLinearGradient>
      <Text style={styles.pageTitleSS}>Create An Account</Text>
      <View>
        <Input
          label="Username"
          invalid={!inputs.username.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "username"),
            value: inputs.username.value,
          }}
        />
        <Input
          label="Fullname"
          invalid={!inputs.username.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "fullname"),
            value: inputs.fullname.value,
          }}
        />
        <Input
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "email"),
            value: inputs.email.value,
            textContentType: "emailAddress",
          }}
        />
        <Input
          label="Password"
          invalid={!inputs.password.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "password"),
            value: inputs.password.value,
            secureTextEntry: true,
          }}
        />
        <CustomImageUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </View>

      <CustomButton
        onPress={signUpHandler}
        buttonStyle={styles.signUp}
        buttonTextStyle={styles.signUpText}
        buttonText={"Sign Up"}
      />
      <CustomButton
        onPress={signInHandler}
        buttonStyle={styles.back}
        buttonTextStyle={styles.backText}
        buttonText={"Sign In"}
        iconName={"back"}
      />
      <StatusBar style="auto" />
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  pageTitleSS: {
    color: "#F1F1F1",
    fontSize: 32,
    marginBottom: 48,
  },
  inputSS: {
    color: "rgba(121,9,105,1)",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 300,
    borderStyle: "solid",
    borderBottomWidth: 3,
    borderBottomColor: "gray",
    borderStartEndRadius: 4,
    borderStartStartRadius: 4,
    marginBottom: 12,
  },
  signUp: {
    marginTop: 96,
  },
  signUpText: {
    fontSize: 24,
    fontWeight: "700",
  },
  back: {
    marginTop: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SignUp;
