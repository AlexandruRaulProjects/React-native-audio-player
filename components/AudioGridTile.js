import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Audio } from "expo-av";

import { db } from "../db/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { AuthContext } from "../context/auth-context";

import { useNavigation } from "@react-navigation/native";

function AudioGridTile({ author, id, mp3FileUri, name, processedFileURI }) {
  const [isChecked, setChecked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [sound, setSound] = useState();

  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const iconSize = 32;

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: mp3FileUri },
      { shouldPlay: false }
    );
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    setSound(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  async function playPauseSound() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playFromPositionAsync(position);
      }
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setPosition(0);
      setIsPlaying(false);
    }
  }

  async function deleteAudioHandler() {
    const userId = authCtx.getProfile()["id"];
    try {
      const audiosRef = doc(db, `profiles`, userId);

      console.log("Restructured destructured audio: ", {
        author,
        id,
        mp3FileUri,
        name,
        processedFileURI,
      });

      await updateDoc(audiosRef, {
        audios: arrayRemove({ author, id, mp3FileUri, name, processedFileURI }),
      });
      console.log("Audio removed successfully");
    } catch (error) {
      console.error("Error removing audio: ", error);
    }

    Alert.alert("Deletion successsful!", "You can press ok to return!");

    navigation.navigate("Menu", {
      numberOfAudios: 20,
    });
  }

  return (
    <View>
      <View style={styles.audioDetails}>
        <View style={styles.image}>
          <AntDesign name="book" size={iconSize} color="#F1F1F1" />
        </View>
        <View style={styles.nameAndAuthor}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>

        <Pressable
          android_ripple={{ color: "#ccc", radius: 10 }}
          onPress={stopSound}
          style={styles.stop}
        >
          <View>
            <Entypo name="controller-stop" size={iconSize} color="#EFE7FF" />
          </View>
        </Pressable>

        <Pressable
          android_ripple={{ color: "#ccc", radius: 10 }}
          onPress={playPauseSound}
          style={styles.playPause}
        >
          <View>
            <AntDesign
              name={isPlaying ? "pausecircleo" : "play"}
              size={iconSize}
              color="#EFE7FF"
            />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#ccc", radius: 10 }}
          onPress={deleteAudioHandler}
          style={styles.playPause}
        >
          <View>
            <AntDesign name="delete" size={24} color="orange" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  audioDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 340,
    height: 100,
    marginBottom: 12,
    backgroundColor: "#71498F",
    borderRadius: 4,
    paddingVertical: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#130045",
  },
  name: {
    color: "#F1F1F1",
    fontSize: 16,
    fontWeight: "500",
  },
  author: {
    color: "#F1F1F1",
    fontSize: 12,
    fontWeight: "200",
  },
  nameAndAuthor: {
    width: 120,
  },
  image: {
    color: "#F1F1F1",
  },
  play: {
    borderRadius: 10,
  },
  playPause: {
    margin: 0,
  },
});

export default AudioGridTile;
