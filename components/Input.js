import { Text, View, TextInput, StyleSheet } from "react-native";

function Input({ label, textInputConfig, invalid }) {
  return (
    <View>
      <Text style={styles.placeholder}>{label}</Text>
      <TextInput
        style={[styles.inputSS, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: "#F1F1F1",
    marginLeft: 4,
    marginBottom: 2,
    fontWeight: "800",
  },
  inputSS: {
    color: "#F1F1F1",
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 300,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#F1F1F1",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 12,
    letterSpacing: 1.25,
  },
  invalidInput: {
    borderBottomColor: "red",
  },
});

export default Input;
