import { View, StyleSheet, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PlaceholderAvatar from "../../assets/svg/onboard/ProfilePlaceholder.svg";
import { showInfo } from "../Toaster";
import i18n from "../../locales/i18n";
import Avatar from '../users/Avatar';

export const defaultAvatars = [
  {
    id: 1,
    filename: "Profile1.png",
  },
  {
    id: 2,
    filename: "Profile2.png",
  },
  {
    id: 3,
    filename: "Profile3.png",
  },
];

const placeholderAvatar = {
  id: -1,
  Component: PlaceholderAvatar,
};

export default function ImageSelector({
  selectedImage,
  onImageSelect,
  customAvatar,
  onCustomAvatarChange,
}) {
  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      onCustomAvatarChange(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
      showInfo(i18n.t("boarding.longPressToUpload"));
    } else {
      showInfo(i18n.t("boarding.avatarUploadCancel"));
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* Image selector (TODO) */}
      {defaultAvatars.map((avatar) => (
        <Pressable
          key={avatar.id}
          style={[
            styles.avatar,
            isSelected(avatar, selectedImage)
              ? styles.selected
              : styles.secondary,
          ]}
          onPress={() => onImageSelect(avatar.id)}
        >
          <Avatar filename={avatar.filename} />
        </Pressable>
      ))}
      <Pressable
        style={[
          styles.avatar,
          isSelected(placeholderAvatar, selectedImage)
            ? styles.selected
            : styles.secondary,
        ]}
        onPress={
          customAvatar ? () => onImageSelect(customAvatar) : handleUpload
        }
        onLongPress={customAvatar ? handleUpload : null}
      >
        {customAvatar ? (
          <View style={styles.customAvatar}>
            <Image source={{ uri: customAvatar }} style={styles.avatar} />
          </View>
        ) : (
          <placeholderAvatar.Component />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selected: {
    backgroundColor: "#F2F3F7",
  },
  secondary: {
    opacity: 0.6,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  customAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

function isSelected(avatar, selectedImage) {
  if (selectedImage === null) return false;
  if (avatar.id === placeholderAvatar.id) {
    return !defaultAvatars.some((avatar) => avatar.id === selectedImage);
  }
  return avatar.id === selectedImage;
}
