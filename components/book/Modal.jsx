import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OptionsModal({
  isVisible,
  onClose,
  children,
  header,
  bgColor,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={[
          modalStyles.modalContent,
          {
            backgroundColor: bgColor ? bgColor : "white",
          },
        ]}
      >
        <View style={modalStyles.titleContainer}>
          <View style={{ height: 20, width: 20 }}></View>
          <Text style={modalStyles.title}>{header}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" color="black" size={20} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modalContent: {
    // height: "15%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    paddingVertical: 10,
    paddingBottom: 20,
    bottom: 0,
  },
  titleContainer: {
    // height: "20%",
    // backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
