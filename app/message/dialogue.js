import * as React from "react";
import { useState } from "react";
import { Image, Text, StyleSheet, View, TextInput, Button, ScrollView } from "react-native";
import { Color, FontSize, FontFamily, Padding, Border } from "../../GlobalStyles";
import { router, useLocalSearchParams } from "expo-router";

const Dialogue = ({name, book1Image, book2Image, book1Title, book2Title, conversationDate}) => {
  const [messages, setMessages] = useState([
    { time: "5:00 PM", text: "Hello!", sender: "user" },
    { time: "5:10 PM", text: "Hello Boy", sender: "friend" },
    { time: "5:15 PM", text: "Bye Bye", sender: "user" },
  ]);

  const params = useLocalSearchParams();

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { time: "Now", text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
    console.log(params.book1Image)
  };

  return (
    <View style={styles.messageInner}>
      <View style={[styles.bar3, styles.bar3FlexBox]}>
        <Text style={[styles.title2, styles.textPosition]}>{params.name}</Text>
      </View>
      <View style={[styles.bookImgParent, styles.bar3FlexBox]}>
        <View style={styles.bookImg}>
          <Image
            style={[styles.image2Icon, styles.image2IconPosition]}
            contentFit="cover"
            source={params.book1Image}
          />
          <View style={[styles.bookImgChild, styles.image2IconPosition]} />
        </View>
        <View style={styles.justiceJusticeParent}>
          <Text style={[styles.justiceJustice, styles.justiceTypo]}>
            {params.book1Title} --- {params.book2Title}
          </Text>
          <View style={[styles.tag, styles.tagFlexBox]}>
            <View style={[styles.tagWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.tag1, styles.tag1Typo]}>Complete exchange</Text>
            </View>
          </View>
        </View>
        <View style={styles.bookImg}>
          <Image
            style={[styles.image2Icon, styles.image2IconPosition]}
            contentFit="cover"
            source={params.book2Image}
          />
          <View style={[styles.bookImgChild, styles.image2IconPosition]} />
        </View>
      </View>
      <ScrollView style={styles.conversationContainer}>
        <Text style={[styles.conversationDate, styles.titleClr]}>{conversationDate}</Text>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageWrapper}>
            <View style={message.sender === "user" ? styles.lg32ProfileParent : styles.pmParent}>
              <Text style={[styles.pm, styles.pmTypo]}>{message.time}</Text>
              <View
                style={[
                  styles.messageBubble,
                  message.sender === "user" ? styles.userMessage : styles.friendMessage,
                ]}
              >
                <Text style={[styles.hello, styles.helloTypo]}>{message.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bar2}>
        <TextInput
          style={[styles.input1, styles.helloTypo]}
          placeholder="send message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의는 기존 코드에서 재사용
  wrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleClr: {
    color: Color.iconOnLightEnable,
    fontSize: FontSize.subtitle03Regular_size,
  },
  parentFlexBox: {
    alignItems: "flex-end",
    flexDirection: "row",
    width: 360,
  },
  lg32Layout: {
    height: 32,
    width: 32,
  },
  pmTypo: {
    textAlign: "left",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  helloWrapperShadowBox: {
    paddingHorizontal: Padding.p_base,
    borderTopRightRadius: Border.br_xl,
    borderTopLeftRadius: Border.br_xl,
    elevation: 4,
    shadowRadius: 4,
    marginLeft: 4,
    paddingVertical: Padding.p_3xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  helloTypo: {
    lineHeight: 21,
    fontSize: FontSize.subtitle02Regular_size,
    textAlign: "left",
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  tagFlexBox: {
    paddingLeft: Padding.p_xs,
    height: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  bar3FlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 360,
    left: 0,
    position: "absolute",
  },
  justiceTypo: {
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
  },
  textPosition: {
    color: Color.colorBlack,
    fontSize: FontSize.heading02Bold_size,
    left: "50%",
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
  tag1Typo: {
    fontFamily: FontFamily.subtitle03Regular,
    fontWeight: "500",
  },
  title2: {
    marginLeft: -59,
    top: 18,
    lineHeight: 30,
    zIndex: 3,
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
    textAlign: "center",
  },
  image2Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  bookImgChild: {
    borderColor: Color.colorGray_100,
    borderWidth: 1,
    borderStyle: "solid",
  },
  bookImg: {
    width: 40,
    height: 60,
  },
  justiceJustice: {
    color: Color.iconOnLightActive,
    textAlign: "center",
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
  },
  tag1: {
    color: Color.iconOnDarkActive,
    textAlign: "center",
    lineHeight: 18,
    fontSize: FontSize.subtitle03Regular_size,
  },
  tagWrapper: {
    paddingRight: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
  },
  sm18Message: {
    width: 18,
    height: 18,
    display: "none",
  },
  tag: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.brandGreenDark,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_7xs,
    marginTop: 8,
    justifyContent: "center",
  },
  justiceJusticeParent: {
    alignItems: "center",
  },
  bookImgParent: {
    top: 60,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.container100,
    paddingHorizontal: Padding.p_xl,
  },
  messageInner: {
    height: 640,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.iconOnDarkActive,
  },
  conversationContainer: {
    paddingTop: 200,
    paddingHorizontal: Padding.p_xl,
    marginBottom: 70,
  },
  conversationDate: {
    marginBottom: Padding.p_xs,
  },
  messageWrapper: {
    marginBottom: Padding.p_5xs,
  },
  messageBubble: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    borderRadius: Border.br_xl,
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
  },
  userMessage: {
    backgroundColor: Color.iconOnDarkActive,
    borderBottomRightRadius: Border.br_9xs,
    borderBottomLeftRadius: Border.br_xl,
  },
  friendMessage: {
    backgroundColor: Color.brandGreenLight,
    borderBottomRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_9xs,
  },
  bar2: {
    bottom: 0,
    shadowRadius: 8,
    elevation: 8,
    paddingRight: Padding.p_sm,
    height: 60,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    paddingLeft: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    width: 360,
    left: 0,
    position: "absolute",
    backgroundColor: Color.iconOnDarkActive,
  },
  input1: {
    color: Color.iconOnLightDisable,
    flex: 1,
    borderColor: Color.container200,
    borderWidth: 1,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_mini,
  },
});

export default Dialogue;
