import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState, useContext } from "react";

import CustomButton from "../components/CustomButton";
import AudioGridTile from "../components/AudioGridTile";
import CustomLinearGradient from "../components/CustomLinearGradient";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorLoadingOverlay from "../components/ErrorOverlay";
import { AuthContext } from "../context/auth-context";
import { useNavigationSearch } from "../hooks/useNavigationSearch";

import { db } from "../db/firebase";
import { doc, getDoc } from "firebase/firestore";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function renderAudioItem(itemData) {
  return (
    <AudioGridTile
      author={itemData.item.author}
      id={itemData.item.id}
      mp3FileUri={itemData.item.mp3FileUri}
      name={itemData.item.name}
      processedFileURI={itemData.item.processedFileURI}
    />
  );
}

function MyAudioBooks({ navigation }) {
  const [fetchedAudios, setFetchedAudios] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find audios",
    },
  });

  const fetchAudios = async (id) => {
    try {
      const audiosRef = doc(db, "profiles", id);
      const audiosSnap = await getDoc(audiosRef);

      if (audiosSnap.exists()) {
        const audiosData = audiosSnap.data();
        return audiosData.audios;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    async function getAudios() {
      setIsFetching(true);
      try {
        const audios = await fetchAudios(authCtx.getProfile()["id"]);
        setFetchedAudios(audios);
      } catch (error) {
        console.error("Error fetching audios:", error);
        setError("Could not fetch audios!");
      }

      setIsFetching(false);
    }

    getAudios();
  }, []);

  function pressHandler() {
    navigation.navigate("Menu");
  }

  if (error && !isFetching) {
    return (
      <CustomLinearGradient>
        <ErrorLoadingOverlay message={error} />
      </CustomLinearGradient>
    );
  }

  if (isFetching) {
    return (
      <CustomLinearGradient>
        <LoadingOverlay />
      </CustomLinearGradient>
    );
  }

  return (
    <CustomLinearGradient>
      <MaterialCommunityIcons
        style={styles.booksshelfIcon}
        name="bookshelf"
        size={64}
        color="#F1F1F1"
      />
      <View style={styles.containerSS}>
        <Text style={styles.titleSS}>Audio Books</Text>
        <FlatList
          style={styles.audiosListSS}
          data={fetchedAudios}
          keyExtractor={(item) => item.id}
          renderItem={renderAudioItem}
          alwaysBounceVertical={false}
        />
        <CustomButton
          onPress={pressHandler}
          iconName="back"
          buttonText=" Back"
        />
      </View>
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  rootSS: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerSS: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 48,
  },
  titleSS: {
    marginTop: 32,
    marginBottom: 48,
    fontSize: 32,
    color: "#F1F1F1",
  },
  audioItemSS: {
    flex: 1,
    flexDirection: "row",
    maxWidth: "90%",
  },
  audiosListSS: {
    marginBottom: 24,
  },
  booksshelfIcon: {
    marginTop: 96,
  },
});

export default MyAudioBooks;
