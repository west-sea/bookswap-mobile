import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Border, FontFamily, FontSize, Color, Padding } from "../../GlobalStyles";
import RightArrow from "../../assets/svg/icon/arrow_right.svg"
import { router, useLocalSearchParams } from "expo-router";

const BookRequestItem = ({ bookImage, profileImage, userName, timeAgo, requestMessage }) => {
    const handlePress = (path) => {
        router.push({
            pathname: path,
            params: {
              //action
            },
        });
    };
  
    return (
    <View style={[styles.groupParent, styles.barFlexBox]}>
      <View style={styles.bookImgParent}>
        <View style={[styles.bookImg, styles.barPosition]}>
          <Image
            style={[styles.image2Icon, styles.image2IconPosition]}
            contentFit="cover"
            source={bookImage}
          />
          <View style={[styles.bookImgChild, styles.image2IconPosition]} />
        </View>
        <View style={[styles.lg32Profile, styles.lg32Layout]}>
          <View style={[styles.circle, styles.circlePosition]}>
            <Image
              style={styles.icon}
              contentFit="cover"
              resizeMode="contain"
              source={profileImage}
            />
          </View>
          
        </View>
      </View>
      <View style={styles.bananaSentARequestToYourParent}>
        <Text style={styles.bananaContainerFlexBox}>
          <Text style={[styles.healthyBoy, styles.okTypo]}>{userName}</Text>
          <Text style={[styles.acceptedYourRequest, styles.okLayout]}>
            {" "}{requestMessage}
          </Text>
        </Text>
        <Text style={[styles.minAgo, styles.okLayout]}>{timeAgo}</Text>
      </View>
      <Pressable>
        <RightArrow/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  barFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  barPosition: {
    top: 0,
    height: 60,
    left: 0,
    position: "absolute",
  },
  image2IconPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  lg32Layout: {
    height: 32,
    width: 32,
  },
  circlePosition: {
    borderRadius: Border.br_181xl,
    left: "8.33%",
    bottom: "8.23%",
    right: "8.23%",
    top: "8.33%",
    width: "83.44%",
    height: "83.44%",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  okTypo: {
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
  },
  okLayout: {
    lineHeight: 18,
    fontSize: FontSize.subtitle03Bold_size,
  },
  image2Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  bookImgChild: {
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderWidth: 1,
  },
  bookImg: {
    width: 40,
  },
  text: {
    marginTop: -10,
    color: Color.colorBlack,
    fontSize: FontSize.heading02Bold_size,
    left: "50%",
    position: "absolute",
    marginLeft: -10,
    textAlign: "left",
    top: "50%",
  },
  lg32Profile: {
    marginTop: -16,
    left: 24,
    top: "50%",
    height: 32,
    width: 32,
    position: "absolute",
    overflow: "hidden",
  },
  bookImgParent: {
    width: 56,
    height: 60,
  },
  healthyBoy: {
    fontSize: 14,
  },
  acceptedYourRequest: {
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  bananaContainerFlexBox: {
    color: Color.iconOnLightActive,
    textAlign: "left",
    alignSelf: "stretch",
  },
  minAgo: {
    color: Color.iconOnLightEnable,
    marginTop: 6,
    textAlign: "left",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
    alignSelf: "stretch",
  },
  bananaSentARequestToYourParent: {
    justifyContent: "center",
    marginLeft: 6,
    flex: 1,
  },
  groupParent: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
    alignSelf: "stretch",
    backgroundColor: Color.containerWhite,
  },
  circle: {
    backgroundColor: Color.colorChocolate,
  },
});

export default BookRequestItem;
