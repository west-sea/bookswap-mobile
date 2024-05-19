import { Pressable, View, Text, StyleSheet } from "react-native";

export default function Button({
  label,
  onPress,
  textColor = "#fff",
  bgColor = "#40B250",
  disabled = false,
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          { backgroundColor: bgColor },
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 50,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 1000,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});
