import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import {
  Padding,
  FontFamily,
  Border,
  FontSize,
  Color,
} from "../../../GlobalStyles";
import { router } from "expo-router";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../assets/svg/brand/Type.svg";
import BookList from "../../../components/book/BooklistItem"; // Adjust the path if needed
import api from "../../../api";
import { getErrorMessage } from "../../../api/error-codes";
import { useSession } from "../../../contexts/auth.ctx";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function Home() {
  const images = {
    image5: require("../../../assets/png/book/book=a little life.png"),
    image6: require("../../../assets/png/book/poem.png"),
    image4: require("../../../assets/png/book/book=small things.png"),
  };

  const [books, setBooks] = useState([
    {
      title: "A Little Life - test",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      image: "image5",
    },
    {
      title: "A Little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      image: "image5",
    },
    {
      title: "A Little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      image: "image5",
    },
    {
      title: "Poems",
      author: "Louise Gluck",
      genre: "Poetry",
      image: "image6",
    },
    {
      title: "Small Things Like These",
      author: "Claire Keegan",
      genre: "Novel",
      image: "image4",
    },
    {
      title: "Small Things Like These",
      author: "Claire Keegan",
      genre: "Novel",
      image: "image4",
    },
  ]);

  const session = useSession();
  useEffect(() => {
    if (session.token === null) {
      router.push({
        pathname: "/auth",
      });
      return;
    }
    // Fetch data from API
    api.books.getFeed(session.token).then((data) => {
      if (data?.code) {
        // Handle error
        const message = getErrorMessage(data.code);
        alert(message);
        return;
      }
      // setBooks(data); // Uncomment this line when you have the data
    });
  }, []);

  const handlePress = (path) => {
    router.push({
      pathname: path,
      params: {
        //action
      },
    });
  };

  const goMessage = () => {
    router.push({
      pathname: "home/home",
    });
  };

  const [activeTab, setActiveTab] = React.useState("All");

  const filteredBooks =
    activeTab === "All"
      ? books || []
      : books?.filter((book) => book.genre === activeTab) || [];

  return (
    <View style={styles.home}>
      <ScrollView
        style={[
          styles.scrollContainer,
          { paddingTop: 120, paddingBottom: 180 },
        ]}
      >
        <BookList filteredBooks={filteredBooks} images={images} />
      </ScrollView>
      <View style={[styles.tabGroupHomeWrapper, styles.barPosition]}>
        <View style={styles.tabGroupHome}>
          {["All", "Major", "Novel", "Essay", "Poetry", "Hobby"].map(
            (tab, idx) => (
              <Pressable key={idx} onPress={() => setActiveTab(tab)}>
                <View style={styles.tab}>
                  <Text
                    style={[
                      styles.tabTypo,
                      activeTab === tab
                        ? styles.activeTabText
                        : styles.inactiveTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                  {activeTab === tab && (
                    <View style={[styles.tabItem, styles.tabLayout]} />
                  )}
                </View>
              </Pressable>
            )
          )}
        </View>
      </View>
      <View style={[styles.bar, styles.barPosition]}>
        <View style={styles.logoTypeWrapper}>
          <Title />
        </View>
        <Pressable
          style={styles.md24Layout}
          onPress={() => handlePress("home/search")}
        >
          <Image
            style={styles.icon}
            resizeMode="contain"
            contentFit="cover"
            source={require("../../../assets/png/icon/search.png")}
          />
        </Pressable>
        <Pressable
          style={styles.md24Layout}
          onPress={() => handlePress("home/homeNotification")}
        >
          <Image
            style={styles.icon}
            resizeMode="contain"
            contentFit="cover"
            source={require("../../../assets/png/icon/noticeFill.png")}
          />
        </Pressable>
      </View>
      <NavigationBar action="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  activeTabText: {
    color: "#0C0E12",
  },
  inactiveTabText: {
    color: "#6E7A9F",
  },
  bookItemSpaceBlock: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
  },
  image5IconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  image5IconPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  textTypo: {
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
    textAlign: "left",
  },
  tagFlexBox: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  tagSpaceBlock: {
    paddingBottom: Padding.p_7xs,
    paddingRight: Padding.p_5xs,
    paddingTop: Padding.p_7xs,
    paddingLeft: Padding.p_xs,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    height: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  tagTypo: {
    textAlign: "center",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
  },
  sm18Layout: {
    height: 18,
    width: 18,
  },
  md24Layout: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  barPosition: {
    left: 0,
    width: 360,
    position: "absolute",
  },
  tabTypo: {
    lineHeight: 21,
    fontSize: FontSize.subtitle02Bold_size,
    textAlign: "center",
    fontFamily: FontFamily.subtitle02Bold,
    fontWeight: "700",
  },
  tabLayout: {
    height: 2,
    borderRadius: Border.br_12xs,
    marginTop: 6,
    alignSelf: "stretch",
  },
  textPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  xl48Layout: {
    height: 4,
    borderRadius: Border.br_11xs,
    left: "50%",
    top: "50%",
    transform: [
      {
        rotate: "45deg",
      },
    ],
    width: 24,
    position: "absolute",
    backgroundColor: Color.containerWhite,
  },
  lg32Layout: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  lg33Layout: {
    height: 28,
    width: 28,
    justifyContent: "center", // 이미지를 중앙에 배치
    alignItems: "center", // 이미지를 중앙에 배치
    overflow: "hidden",
  },
  image5Icon: {
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
  },
  bookImg: {
    width: 80,
    height: 120,
  },
  title: {
    fontSize: FontSize.subtitle01Bold_size,
    lineHeight: 24,
    display: "flex",
    width: 196,
    height: 24,
    textAlign: "left",
    fontFamily: FontFamily.subtitle02Bold,
    fontWeight: "700",
    alignItems: "center",
    color: Color.iconOnLightActive,
  },
  author: {
    marginTop: 6,
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
    fontWeight: "500",
    color: Color.iconOnLightActive,
  },
  novel: {
    color: Color.iconOnLightEnable,
    marginTop: 6,
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
    fontWeight: "500",
  },
  titleParent: {
    alignSelf: "stretch",
  },
  tag1: {
    color: Color.iconOnLightActive,
  },
  tagWrapper: {
    paddingRight: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sm18Message: {
    display: "none",
  },
  tag: {
    backgroundColor: Color.container200,
  },
  hideFrom1: {
    marginLeft: 8,
    color: Color.iconOnLightEnable,
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
    fontWeight: "500",
  },
  tagParent: {
    justifyContent: "center",
  },
  frameParent: {
    justifyContent: "space-between",
    marginLeft: 10,
    alignSelf: "stretch",
    flex: 1,
  },
  md24Menu: {
    display: "none",
  },
  bookItem: {
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    alignSelf: "stretch",
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.containerWhite,
  },
  tag3: {
    color: Color.containerWhite,
  },
  tag2: {
    backgroundColor: Color.iconOnLightEnable,
  },
  tag5: {
    color: Color.iconOnLightDisable,
  },
  tag4: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.container100,
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: "center",
  },
  bookItemParent: {
    top: 97,
    height: 467,
    paddingVertical: Padding.p_3xs,
    width: 360,
    left: 0,
    position: "absolute",
  },
  tab1: {
    color: Color.iconOnLightActive,
  },
  tabChild: {
    backgroundColor: Color.iconOnLightActive,
    height: 2,
    borderRadius: Border.br_12xs,
  },
  tab: {
    paddingTop: Padding.p_5xs,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.containerWhite,
  },
  tab3: {
    color: Color.iconOnLightEnable,
  },
  tabItem: {
    height: 2,
    borderRadius: Border.br_12xs,
  },
  tabGroupHome: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_3xs,
    flexDirection: "row",
    backgroundColor: Color.containerWhite,
  },
  tabGroupHomeWrapper: {
    top: 60,
    width: 360,
  },
  logoType: {
    width: 120,
    height: 40,
    overflow: "hidden",
  },
  logoTypeWrapper: {
    justifyContent: "center",
    flex: 1,
  },
  md24SearchChild: {
    height: "58.33%",
    width: "58.33%",
    top: "12.5%",
    right: "29.17%",
    bottom: "29.17%",
    left: "12.5%",
  },
  md24SearchItem: {
    right: 1,
    bottom: 8,
    width: 9,
    transform: [
      {
        rotate: "45deg",
      },
    ],
    height: 2,
    backgroundColor: Color.iconOnLightActive,
    borderRadius: Border.br_12xs,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  bar: {
    top: 0,
    height: 60,
    paddingLeft: Padding.p_3xs,
    paddingRight: Padding.p_xl,
    alignItems: "center",
    flexDirection: "row",
    width: 360,
    backgroundColor: Color.containerWhite,
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
    backgroundColor: "FFF",
  },
  home: {
    height: 640,
    marginTop: screenHeight * 0.03,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.containerWhite,
  },
});

export default Home;
