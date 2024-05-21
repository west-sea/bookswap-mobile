import * as React from "react";
import { StyleSheet, View, Text, ScrollView, Image, Pressable } from "react-native";
import ChatItem from "../../../components/message/ChatItem"; // 방금 만든 컴포넌트를 불러옵니다.
import { Padding, Color, Border, FontFamily, FontSize } from "../../../GlobalStyles";
import NavigationBar from "../../../components/NavigationBar";
import { router, useLocalSearchParams } from "expo-router";

const chatItems = [
    {
      bookImage1: require("../../../assets/png/book/poem.png"),
      bookImage2: require("../../../assets/png/book/book=justice.png"),
      userName: "Healthy Boy",
      lastMessage: "Bye Bye",
      book1Title: "poem",
      book2Title: "justice",
      conversationDate: "5:15 PM",
    },
    {
      bookImage1: require("../../../assets/png/book/book=me before you.png"),
      bookImage2: require("../../../assets/png/book/book=justice.png"),
      userName: "Shot Gun",
      lastMessage: "Have a nice day",
      book1Title: "me before you",
      book2Title: "justice",
      conversationDate: "5 days",
    },
    {
      bookImage1: require("../../../assets/png/book/book=justice.png"),
      bookImage2: require("../../../assets/png/book/book=justice.png"),
      userName: "Fire Melon",
      lastMessage: "Nice!",
      book1Title: "justice",
      book2Title: "justice",
      conversationDate: "1 week",
    }
  ];

const Message = () => {
    const handlePress = (oneChatItem) => {
        router.push({
            pathname: 'message/dialogue',
            params: {
                name: oneChatItem.userName,
                book1Image: oneChatItem.bookImage1,
                book2Image: oneChatItem.bookImage2,
                book1Title: oneChatItem.book1Title,
                book2Title: oneChatItem.book2Title,
                conversationDate: oneChatItem.conversationDate
                //name,
            },
        });
    };

    const renderChatItems = () => {
        const chatItemList = [];
        for (let i = 0; i < 6; i++) {
          const item = chatItems[i % chatItems.length];
          chatItemList.push(
            <Pressable key={i} onPress={() => handlePress(item)}>
              <ChatItem
                bookImage1={item.bookImage1}
                bookImage2={item.bookImage2}
                userName={item.userName}
                lastMessage={item.lastMessage}
                time={item.conversationDate}
              />
            </Pressable>
          );
        }
        return chatItemList;
      };

  return (
    <View style={styles.message}>
    <View style={styles.bar}>
      <Text style={[styles.title, styles.text1Typo]}>Message</Text>
    </View>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {renderChatItems()}
    </ScrollView>
    <NavigationBar action="message"/>
  </View>
);
};


      const styles = StyleSheet.create({
        message: {
          flex: 1,
          backgroundColor: Color.containerWhite,
        },
        bar: {
          paddingVertical: 0,
          height: 60,
          paddingHorizontal: Padding.p_xl,
          backgroundColor: Color.containerWhite,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        title: {
          lineHeight: 30,
          color: Color.colorBlack,
          fontSize: FontSize.heading02Bold_size,
          flex: 1,
        },
        md24Search: {
          width: 24,
          height: 24,
        },
        scrollView: {
          paddingBottom: 50,
        },
        navigation: {
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Color.containerWhite,
          borderTopWidth: 1,
          borderTopColor: Color.colorGray_200,
          paddingHorizontal: Padding.p_xl,
        },
        navigationItem: {
          alignItems: "center",
          flex: 1,
        },
        home: {
          textAlign: "center",
          color: Color.iconOnLightActive,
          fontFamily: FontFamily.subtitle03Regular,
          fontWeight: "500",
        },
        lg32Layout: {
          height: 32,
          width: 32,
        },
        xl48Add: {
          height: 48,
          alignItems: "center",
          justifyContent: "center",
        },
        xl48AddChild: {
          width: 40,
          height: 40,
        },
        xl48AddItem: {
          width: 24,
          height: 4,
          backgroundColor: Color.containerWhite,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: [{ rotate: "45deg" }, { translateX: -12 }, { translateY: -2 }],
        },
        xl48AddInner: {
          width: 24,
          height: 4,
          backgroundColor: Color.containerWhite,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: [{ rotate: "-45deg" }, { translateX: -12 }, { translateY: -2 }],
        },
        lg32MessageFillParent: {
          alignItems: "center",
          flex: 1,
        },
        lg32BookLineParent: {
          alignItems: "center",
          flex: 1,
        },
        lg32ProfileParent: {
          alignItems: "center",
          flex: 1,
        },
        lg32Profile3: {
          overflow: "hidden",
        },
        circle3: {
          height: "83.44%",
          width: "83.44%",
          right: "8.23%",
          bottom: "8.23%",
          backgroundColor: Color.colorGray_100,
          borderRadius: Border.br_181xl,
          left: "8.33%",
          top: "8.33%",
        },
        text6: {
          marginTop: -9,
          marginLeft: -9,
          fontSize: FontSize.size_lg,
          textAlign: "left",
          color: Color.colorBlack,
          left: "50%",
          top: "50%",
          position: "absolute",
        },
      });
      
      export default Message;