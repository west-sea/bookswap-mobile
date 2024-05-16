//import * as React from "react";
//import { Image } from "expo-image";
import { Image, StyleSheet, View, Text ,TextInput, ScrollView, Pressable } from "react-native";
import { Padding, FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { router, useLocalSearchParams } from "expo-router";
import LeftArrow from "../../assets/svg/icon/arrow_left.svg"

const images = {
    image5: require("../../assets/svg/book/life.svg"),
    image6: require("../../assets/svg/book/poem.svg"),
    image4: require("../../assets/svg/book/small.svg"),
    //sm18Cancel: require("../assets/sm18--cancel.png")
  };
  
  const books = [
    { title: "A Little Life", author: "Yanagihara, Hanya", genre: "Novel", image: 'image5' },
    { title: "Poems", author: "Louise Gluck", genre: "Poetry", image: 'image6' },
    { title: "Small Things Like These", author: "Claire Keegan", genre: "Novel", image: 'image4' },
  ];

  export default function Search() {
    const handlePress = () => {
      router.push({
          pathname: 'home/home',
          params: {
              //img,
              //email,
              //name,
          },
      });
    };



  return (
    <View style={[styles.typesearch, styles.typetitlePosition]}>
    <Pressable
      style={[styles.md24ArrowLeft, styles.md24Layout]}
      onPress={() => handlePress()}
    >
    <LeftArrow/>
    </Pressable>
    <View style={[styles.input4, styles.inputBorder]}>
      <TextInput style={[styles.input1, styles.tag2Typo]}>input</TextInput>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    typesearch: {
        top: 20,
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



















