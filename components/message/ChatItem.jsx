import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Padding, Color, Border, FontFamily, FontSize } from "../../GlobalStyles";

const ChatItem = ({ bookImage1, bookImage2, userName, lastMessage, time }) => {
  return (
    <View style={[styles.messageItem, styles.barSpaceBlock]}>
      <View style={styles.rectangleParent}>
        <View style={[styles.frameChild, styles.barPosition]} />
        <View style={[styles.bookImg, styles.bookLayout]}>
          <Image
            style={[styles.image2Icon, styles.image2IconLayout]}
            source={bookImage1}
          />
          <View style={[styles.bookImgChild, styles.image2IconPosition]} />
        </View>
        <View style={[styles.lg32Profile, styles.md24SearchLayout]}>
          <View style={[styles.circle, styles.circlePosition]} />
          <Text style={[styles.text, styles.textTypo]}>📚</Text>
        </View>
        <View style={[styles.bookImg1, styles.bookLayout]}>
          <Image
            style={[styles.image2Icon, styles.image2IconLayout]}
            source={bookImage2}
          />
          <View style={[styles.bookImgChild, styles.image2IconPosition]} />
        </View>
      </View>
      <View style={styles.bananaParent}>
        <Text style={styles.banana}>{userName}</Text>
        <Text style={[styles.thankYouWhen, styles.homeTypo]}>{lastMessage}</Text>
      </View>
      <View style={styles.pmParent}>
        <Text style={styles.pm}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의는 이전과 동일합니다.
  // 필요한 스타일만 추가하였습니다.
  barSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    backgroundColor: Color.containerWhite,
    flexDirection: "row",
    paddingVertical: Padding.p_5xs,
    width: 360,
  },
  barPosition: {
    top: 0,
    height: 60,
  },
  bookLayout: {
    width: 32,
    top: 6,
    height: 48,
    position: "absolute",
  },
  image2IconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  image2IconPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  md24SearchLayout: {
    height: 24,
    width: 24,
  },
  circlePosition: {
    borderRadius: Border.br_181xl,
    left: "8.33%",
    top: "8.33%",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  homeTypo: {
    marginTop: 6,
    color: Color.iconOnLightActive,
    lineHeight: 18,
    fontSize: FontSize.subtitle03Bold_size,
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  text1Typo: {
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
    textAlign: "left",
  },
  wrapperLayout: {
    height: 20,
    width: 20,
    backgroundColor: Color.colorTomato,
    borderRadius: Border.br_mini,
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  frameChild: {
    backgroundColor: Color.brandGreenLight,
    display: "none",
    width: 92,
    top: 0,
    left: 0,
    position: "absolute",
  },
  image2Icon: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  bookImgChild: {
    borderStyle: "solid",
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    position: "absolute",
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
  },
  bookImg: {
    left: 6,
    height: 48,
  },
  circle: {
    backgroundColor: Color.colorChocolate,
    bottom: "8.33%",
    right: "8.33%",
    width: "83.33%",
    height: "83.33%",
    borderRadius: Border.br_181xl,
    left: "8.33%",
    top: "8.33%",
  },
  text: {
    marginTop: -10,
    marginLeft: -10,
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.heading02Bold_size,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  lg32Profile: {
    left: 26,
    top: "50%",
    width: 24,
    marginTop: -12,
    position: "absolute",
    overflow: "hidden",
  },
  bookImg1: {
    left: 54,
    height: 48,
  },
  banana: {
    color: Color.iconOnLightActive,
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
    alignSelf: "stretch",
    lineHeight: 18,
    fontSize: FontSize.subtitle03Bold_size,
    textAlign: "left",
  },
  thankYouWhen: {
    alignSelf: "stretch",
    textAlign: "left",
  },
  bananaParent: {
    marginLeft: 6,
    flex: 1,
  },
  pm: {
    color: Color.iconOnLightEnable,
    lineHeight: 18,
    fontSize: FontSize.subtitle03Bold_size,
    textAlign: "left",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  pmParent: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    marginLeft: 6,
  },
  rectangleParent: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.container100,
    height: 60,
    width: 92,
    overflow: "hidden",
  },
});

export default ChatItem;
