import { Button, StyleSheet, View } from "react-native";
import { useSession } from "../../contexts/auth.ctx";

export default function Page() {
  const { signOut } = useSession();

  const logOut = () => {
    // Implement log out
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
