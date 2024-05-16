import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Padding, FontFamily, Border, FontSize, Color } from "../GlobalStyles";
import { router, useLocalSearchParams } from "expo-router";
import HomeFill from "../assets/svg/icon/homeFill.svg";
import HomeLine from "../assets/svg/icon/homeLine.svg";
import BookFill from "../assets/svg/icon/bookFill.svg";
import BookLine from "../assets/svg/icon/bookLine.svg";
import MessageFill from "../assets/svg/icon/messageFill.svg";
import MessageLine from "../assets/svg/icon/messageLine.svg";
import Add from "../assets/svg/icon/Add.svg";

const NavigationBar = (action) => {
    console.log('Action:', action);
    const handlePress = (routerPath) => {
        router.push({
            pathname: routerPath,
            params: {
                //img,
                //email,
                //name,
            },
        });
    };

  return (
    <View style={[styles.navigation, styles.barPosition]}>
      <View style={[styles.blurBg, styles.textPosition]} />
      <Pressable style={[styles.navigationItem, styles.bookItemSpaceBlock]} onPress={() => handlePress('home/home')}>
      {action.action === "home" ? <HomeFill /> : <HomeLine />}
        <Text style={[styles.home2, styles.tagTypo]}>Home</Text>
      </Pressable>
      <Pressable style={[styles.lg32MessageLineParent, styles.bookItemSpaceBlock]} onPress={() => handlePress('message/chatList')}>
      {action.action === "message" ? <MessageFill /> : <MessageLine />}
        <Text style={[styles.home1, styles.tagTypo]}>Message</Text>
      </Pressable>
      <Pressable style={styles.xl48Add} onPress={() => handlePress('home/home')}>
        <Add/>
      </Pressable>
      <Pressable style={[styles.lg32BookLineParent, styles.bookItemSpaceBlock]} onPress={() => handlePress('home/home')}>
      {action.action === 'book' ? <BookFill /> : <BookLine />}
    <Text style={[styles.home2, styles.tagTypo]}>My Books</Text>
      </Pressable>
    <Pressable style={[styles.lg32ProfileParent, styles.bookItemSpaceBlock]} onPress={() => handlePress('home/home')}>  
    <View style={[styles.lg32Profile, styles.lg32Layout]}>
          <View style={styles.circle} />
                <Text style={[styles.text, styles.textPosition]}>🌈</Text>
          </View>
        <Text style={[styles.home1, styles.tagTypo]}>Profile</Text>
     </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  bookItemSpaceBlock: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
  },
  barPosition: {
    left: 0,
    width: 360,
    position: "absolute",
  },
  tagTypo: {
    textAlign: "center",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
  },
  textPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  lg32Layout: {
    height: 32,
    width: 32,
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden',
  },
  lg33Layout: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  blurBg: {
    marginTop: -38,
    marginLeft: -180,
    backgroundColor: Color.colorGray_300,
    height: 76,
    zIndex: 0,
    width: 360,
  },
  home1: {
    marginTop: 6,
    color: Color.iconOnLightActive,
  },
  home2: {
    marginTop: 10,
    color: Color.iconOnLightActive,
  },
  navigationItem: {
    zIndex: 1,
    alignItems: "center",
    paddingVertical: Padding.p_3xs,
    flex: 1,
  },
  lg32MessageLineParent: {
    zIndex: 2,
    alignItems: "center",
    paddingVertical: Padding.p_3xs,
    flex: 1,
  },
  xl48AddChild: {
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
  },
  xl48Add: {
    height: 48,
    zIndex: 3,
    overflow: "hidden",
    flex: 1,
  },
  lg32BookLineParent: {
    zIndex: 4,
    alignItems: "center",
    paddingVertical: Padding.p_3xs,
    flex: 1,
  },
  circle: {
    height: "83.44%",
    width: "83.44%",
    top: "8.33%",
    right: "8.23%",
    bottom: "8.23%",
    left: "8.33%",
    borderRadius: Border.br_181xl,
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  text: {
    marginTop: -9,
    marginLeft: -9,
    fontSize: FontSize.size_lg,
    color: Color.colorBlack,
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
    textAlign: "left",
  },
  lg32Profile: {
    overflow: "hidden",
  },
  lg32ProfileParent: {
    zIndex: 5,
    alignItems: "center",
    paddingVertical: Padding.p_3xs,
    flex: 1,
  },
  navigation: {
    bottom: 0,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    alignItems: "center",
    flexDirection: "row",
    width: 360,
    overflow: "hidden",
    backgroundColor: "FFF"
  }
});

export default NavigationBar;
