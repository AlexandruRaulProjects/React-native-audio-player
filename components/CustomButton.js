import { View, StyleSheet, Text, Pressable } from "react-native";

import { AntDesign } from "@expo/vector-icons";

function CustomButton({
  iconName,
  buttonText,
  onPress,
  buttonTextStyle,
  buttonStyle,
  disabled,
}) {
  return (
    <View style={[styles.button, buttonStyle]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "rgba(117,29,124,0.2)" }}
        disabled={disabled && true}
      >
        <View style={styles.buttonText}>
          <Text>
            <View style={styles.flexRowSS}>
              {iconName !== null && (
                <AntDesign
                  name={iconName}
                  size={16}
                  color="rgba(117,29,124,1)"
                />
              )}
              <Text style={[styles.buttonTextSS, buttonTextStyle]}>
                {" "}
                {buttonText}
              </Text>
            </View>
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F1F1F1",
    fontSize: 24,
    borderRadius: 6,
  },
  buttonText: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    fontWeight: 600,
  },
  buttonTextSS: {
    color: "rgba(117,29,124,1)",
  },
  flexRowSS: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomButton;
