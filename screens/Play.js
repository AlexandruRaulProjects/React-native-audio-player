import CustomLinearGradient from "../components/CustomLinearGradient";
import { View, StyleSheet } from "react-native";

function Play() {
  return (
    <View>
      <Text>Play screen</Text>
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
    marginBottom: 12,
    backgroundColor: "#71498F",
    borderRadius: 4,
    paddingVertical: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#130045",
  },
});

export default Play;
