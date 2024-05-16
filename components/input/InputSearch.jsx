import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image, Color, Border, Padding, FontFamily, FontSize } from "../../GlobalStyles";

export default function InputSearch() {
  return (
    <View style={[styles.typesearch, styles.typetitlePosition]}>
    <Pressable
      style={[styles.md24ArrowLeft, styles.md24Layout]}
      onPress={() => navigation.goBack()}
    >
      <Image
        style={styles.icon}
        contentFit="cover"
        source={require("../../assets/svg/icon/arrow_left.svg")}
      />
    </Pressable>
    <View style={[styles.input4, styles.inputBorder]}>
      <Text style={[styles.input1, styles.tag2Typo]}>input</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    typesearch: {
        top: 594,
    },
    typetitlePosition: {
        paddingRight: Padding.p_mini,
        paddingLeft: Padding.p_3xs,
        height: 60,
        width: 320,
        left: "50%",
        marginLeft: -160,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: Color.iconOnDarkActive,
        position: "absolute",
      },
      md24ArrowLeft: {
        height: 24,
      },
      md24Layout: {
        width: 24,
        height: 24,
      },
      icon: {
        height: "100%",
        width: "100%",
      },
      input4: {
        marginLeft: 10,
        backgroundColor: Color.iconOnDarkActive,
        flex: 1,
      },
      inputBorder: {
        paddingRight: Padding.p_7xs,
        paddingLeft: Padding.p_xs,
        alignItems: "center",
        flexDirection: "row",
        height: 30,
        borderColor: Color.container200,
        borderStyle: "solid",
        borderRadius: Border.br_mini,
        borderWidth: 1,
      },
      input1: {
        textAlign: "left",
        lineHeight: 21,
        fontSize: FontSize.subtitle02Bold_size,
        flex: 1,
      },
      tag2Typo: {
        color: Color.iconOnLightDisable,
        //fontFamily: FontFamily.subtitle03Regular,
        //fontWeight: "500",
      },
    
    
    
});



















