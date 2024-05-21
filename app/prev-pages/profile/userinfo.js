import * as React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Padding, Border, Color, FontFamily, FontSize } from "../../../GlobalStyles";
import NavigationBar from "../../../components/NavigationBar";

const profileData = {
  profileImage: require("../../../assets/png/icon/profile.png"),
  profileEmoji: "🌈",
  userName: "Rainbow",
  requestCount: 3,
  genreCount: 2,
  language: "Eng"
};

const Profile = () => {
  const { profileImage, profileEmoji, userName, requestCount, genreCount, language } = profileData;

  return (
    <View style={styles.profile}>
      <View style={[styles.instanceParent, styles.navigationPosition]}>
        <Pressable
          style={[styles.md24RequestParent, styles.md24SpaceBlock]}
          onPress={() => {}}
        >
          <Image
            style={styles.md24Layout}
            contentFit="cover"
            source={require("../../../assets/png/icon/profile.png")}
          />
          <Text style={styles.myRequests}>My Requests</Text>
          <Text style={styles.textTypo}>{requestCount}</Text>
        </Pressable>
        <Pressable style={styles.md24ParentSpaceBlock} onPress={() => {}}>
          <Image
            style={styles.md24Layout}
            contentFit="cover"
            source={require("../../../assets/png/icon/profile.png")}
          />
          <Text style={styles.myRequests}>Favorite Genre</Text>
          <Text style={styles.textTypo}>{genreCount}</Text>
        </Pressable>
        <View style={styles.md24ParentSpaceBlock}>
          <Image
            style={styles.md24Layout}
            contentFit="cover"
            source={require("../../../assets/png/icon/profile.png")}
          />
          <Text style={styles.myRequests}>Language</Text>
          <Text style={styles.textTypo}>{language}</Text>
        </View>
        <Pressable
          style={[styles.md24HiParent, styles.md24ParentSpaceBlock]}
          onPress={() => {}}
        >
          <Image
            style={styles.md24Layout}
            contentFit="cover"
            source={require("../../../assets/png/icon/profile.png")}
          />
          <Text style={styles.myRequests}>Hi, we are SSS</Text>
          <Text style={[styles.text3, styles.textTypo]}>2</Text>
        </Pressable>
      </View>
      <Pressable
        style={[styles.md24HiGroup, styles.tagFlexBox]}
        onPress={() => {}}
      >
        <Image
          style={[styles.md24Hi1, styles.md24Layout]}
          contentFit="cover"
          source={require("../../../assets/png/icon/profile.png")}
        />
        <Text style={styles.myRequests4}>Logout</Text>
        <Text style={[styles.text3, styles.textTypo]}>2</Text>
      </Pressable>
      <View style={[styles.lg32Parent, styles.barSpaceBlock]}>
        <View style={styles.lg32}>
          <View style={[styles.circle, styles.circlePosition]} />
          <Text style={[styles.text5, styles.textClr]}>{profileEmoji}</Text>
        </View>
        <Text style={[styles.rainbow, styles.tagSpaceBlock]}>{userName}</Text>
        <Pressable
          style={[styles.tag, styles.tagSpaceBlock]}
          onPress={() => {}}
        >
          <View style={[styles.tagWrapper, styles.tagFlexBox]}>
            <Text style={styles.tag1Typo}>Edit</Text>
          </View>
          <Image
            style={styles.sm18Message}
            contentFit="cover"
            source={require("../../../assets/png/icon/profile.png")}
          />
        </Pressable>
      </View>
      <NavigationBar />
      <View style={[styles.bar, styles.barSpaceBlock]}>
        <Text style={[styles.title, styles.textClr]}>Profile</Text>
        <Image
          style={[styles.md24Add, styles.md24Layout]}
          contentFit="cover"
          source={require("../../../assets/png/icon/profile.png")}
        />
        <Image
          style={[styles.md24Add, styles.md24Layout]}
          contentFit="cover"
          source={require("../../../assets/png/icon/profile.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationPosition: {
    left: 0,
    position: "absolute",
    width: 360,
  },
  md24SpaceBlock: {
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_base,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_3xs,
    height: 38,
    borderRadius: Border.br_xl,
    alignItems: "center",
  },
  md24ParentSpaceBlock: {
    marginTop: 10,
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_base,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    height: 38,
    backgroundColor: Color.container100,
    borderRadius: Border.br_xl,
    alignSelf: "stretch",
  },
  textTypo: {
    textAlign: "right",
    fontFamily: FontFamily.heading01Bold,
    fontWeight: "700",
    marginLeft: 10,
    color: Color.iconOnLightActive,
    lineHeight: 21,
    fontSize: FontSize.subtitle02Bold_size,
  },
  tagFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  md24Layout: {
    height: 24,
    width: 24,
  },
  barSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    flexDirection: "row",
    width: 360,
    left: 0,
    position: "absolute",
  },
  circlePosition: {
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_181xl,
    left: "8.33%",
    top: "8.33%",
    position: "absolute",
  },
  textClr: {
    color: Color.colorBlack,
    textAlign: "left",
  },
  tagSpaceBlock: {
    marginLeft: 4,
    alignItems: "center",
  },
  textPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  lg32ParentSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: 0,
    alignItems: "center",
    flex: 1,
  },
  tag1Typo: {
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
    textAlign: "center",
    color: Color.iconOnLightActive,
    fontFamily: FontFamily.subtitle02Regular,
    fontWeight: "500",
  },
  xl48Layout: {
    transform: [
      {
        rotate: "90deg",
      },
    ],
    height: 4,
    borderRadius: Border.br_11xs,
    left: "50%",
    top: "50%",
    width: 24,
    position: "absolute",
    backgroundColor: Color.containerWhite,
  },
  lg32Layout: {
    height: 32,
    width: 32,
  },
  myRequests: {
    marginLeft: 10,
    textAlign: "left",
    color: Color.iconOnLightActive,
    lineHeight: 21,
    fontSize: FontSize.subtitle02Bold_size,
    fontFamily: FontFamily.subtitle02Regular,
    fontWeight: "500",
    flex: 1,
  },
  md24RequestParent: {
    flexDirection: "row",
    backgroundColor: Color.container100,
    alignSelf: "stretch",
    paddingRight: Padding.p_base,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_3xs,
    height: 38,
    borderRadius: Border.br_xl,
  },
  text3: {
    display: "none",
  },
  md24HiParent: {
    overflow: "hidden",
  },
  instanceParent: {
    top: 144,
    padding: Padding.p_xl,
    width: 360,
  },
  md24Hi1: {
    display: "none",
  },
  myRequests4: {
    textDecoration: "underline",
    fontFamily: FontFamily.istokWebRegular,
    color: Color.iconOnLightEnable,
    textAlign: "center",
    marginLeft: 10,
    lineHeight: 21,
    fontSize: FontSize.subtitle02Bold_size,
  },
  md24HiGroup: {
    top: 510,
    left: 145,
    paddingBottom: Padding.p_3xs,
    paddingRight: Padding.p_base,
    paddingTop: Padding.p_3xs,
    paddingLeft: Padding.p_3xs,
    height: 38,
    borderRadius: Border.br_xl,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.containerWhite,
  },
  circle: {
    height: "83.38%",
    width: "83.38%",
    right: "8.29%",
    bottom: "8.29%",
  },
  text5: {
    marginTop: -22,
    marginLeft: -22,
    fontSize: 44,
    left: "50%",
    top: "50%",
    position: "absolute",
    color: Color.colorBlack,
    fontFamily: FontFamily.subtitle02Regular,
    fontWeight: "500",
  },
  lg32: {
    width: 80,
    height: 80,
    overflow: "hidden",
  },
  rainbow: {
    fontSize: FontSize.heading01Bold_size,
    lineHeight: 36,
    display: "flex",
    width: 185,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.heading01Bold,
    fontWeight: "700",
  },
  tagWrapper: {
    paddingRight: Padding.p_9xs,
    alignItems: "center",
  },
  sm18Message: {
    width: 18,
    height: 18,
    display: "none",
  },
  tag: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.container200,
    height: 30,
    paddingLeft: Padding.p_xs,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_7xs,
    justifyContent: "center",
    flexDirection: "row",
  },
  lg32Parent: {
    top: 64,
  },
  blurBg: {
    marginTop: -38,
    marginLeft: -180,
    backgroundColor: Color.colorGray_200,
    height: 76,
    zIndex: 0,
    width: 360,
  },
  home: {
    marginTop: 6,
  },
  navigationItem: {
    zIndex: 1,
  },
  lg32MessageLineParent: {
    zIndex: 2,
  },
  xl48AddChild: {
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
  },
  xl48AddItem: {
    marginTop: -12,
    marginLeft: 2,
  },
  xl48AddInner: {
    marginTop: 2,
    marginLeft: 12,
  },
  xl48Add: {
    height: 48,
    zIndex: 3,
    overflow: "hidden",
    flex: 1,
  },
  lg32BookLineParent: {
    zIndex: 4,
  },
  circle1: {
    height: "83.44%",
    width: "83.44%",
    right: "8.23%",
    bottom: "8.23%",
  },
  text6: {
    marginTop: -9,
    marginLeft: -9,
    fontSize: FontSize.size_lg,
    left: "50%",
    top: "50%",
    position: "absolute",
    color: Color.colorBlack,
    fontFamily: FontFamily.subtitle02Regular,
    fontWeight: "500",
  },
  lg32Profile: {
    overflow: "hidden",
  },
  lg32ProfileParent: {
    zIndex: 5,
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
  },
  title: {
    fontSize: FontSize.heading02Bold_size,
    lineHeight: 30,
    fontFamily: FontFamily.heading01Bold,
    fontWeight: "700",
    color: Color.colorBlack,
    flex: 1,
  },
  md24Add: {
    display: "none",
    marginLeft: 10,
  },
  bar: {
    top: 0,
    height: 60,
    backgroundColor: Color.containerWhite,
  },
  profile: {
    width: "100%",
    height: 640,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.containerWhite,
  },
});

export default Profile;
