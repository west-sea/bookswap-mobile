import { Button, StyleSheet, View } from "react-native";
import { useSession } from "../contexts/auth.ctx";
import Toast from "react-native-toast-message";

export default function Page() {
  const { signOut } = useSession();

  const logOut = () => {
    // Implement log out
    Toast.show({
      type: "success",
      text1: "Logged Out",
      text2: "You have been logged out successfully.",
      position: "bottom",
      onPress: () => {
        Toast.hide();
      },
    });
    signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="Log Out" color="red" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    fontSize: 48,
  },
});
