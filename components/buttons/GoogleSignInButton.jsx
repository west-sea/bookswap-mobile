import { Pressable, View, Text, StyleSheet } from "react-native";
import GoogleIcon from "../../assets/svg/GoogleIcon.svg";
import { useTranslation } from "react-i18next";

export default function GoogleSignInButton({ onPress, isLoading = false }) {
  const { i18n } = useTranslation();

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: isLoading ? "#ccc" : "#fff",
          },
        ]}
        disabled={isLoading}
      >
        <View style={styles.buttonIcon}>
          <GoogleIcon />
        </View>
        <Text style={styles.buttonLabel}>{i18n.t('auth.googleSignIn')}</Text>
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
    color: "#000",
  },
  buttonLabel: {
    fontSize: 18,
    color: "#000",
  },
});
