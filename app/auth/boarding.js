import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/buttons/Button";
import ImageSelector from "../../components/input/ImageSelector";
import InputText from "../../components/input/InputText";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function BoardingPage() {
  const params = useLocalSearchParams();
  const [name, setName] = useState(params?.name || "Booklover");
  const [nickname, setNickname] = useState(
    params?.name.toLowerCase().split(" ").join("-") || "booklover"
  );
  const [preferredGenres, setPreferredGenres] = useState([]);

  const onNameChange = (name) => {
    setName(name ? name.trim() : "");
  };

  const onNicknameChange = (nickname) => {
    setNickname(nickname ? nickname.trim() : "");
  };

  const onBoardComplete = () => {
    const userData = {
      nickname: nickname,
      email: params?.email,
      userId: params?.userId,
      preferredGenres,
    };
    console.log(userData);
    // TODO: send data to server
    router.push({
      pathname: "/auth/welcome",
      params: {
        name: params?.name,
      },
    });
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        {/* Welcome text */}
        <View>
          <Text style={styles.text}>Welcome to BookSwap!</Text>
          <Text style={styles.text}>Let me know about you.</Text>
        </View>
        {/* Profile image selector */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Avatar</Text>
          <ImageSelector />
        </View>
        {/* Name input */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name</Text>
          <InputText defaultValue={name} onChangeText={onNameChange} />
        </View>
        {/* Nickname input */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Nickname</Text>
          <InputText defaultValue={nickname} onChangeText={onNicknameChange} />
        </View>
        {/* Genre selector (conditionally rendered) */}
        {/* Next/Complete button */}
      </View>
      <View style={styles.button}>
        <Button label="Next" onPress={onBoardComplete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  text: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 32,
  },
  field: {
    textAlign: "left",
    width: "80%",
    gap: 8,
  },
  fieldLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginBottom: 50,
    alignItems: "center",
  },
});
