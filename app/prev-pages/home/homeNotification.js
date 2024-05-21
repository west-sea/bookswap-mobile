import * as React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import BookRequestItem from "../../../components/book/BookRequestItem";
import { Color, FontFamily, FontSize, Padding } from "../../../GlobalStyles";

const HomeNotification = () => {
  const requests = [
    {
      bookImage: require("../../../assets/png/book/book=justice.png"),
      profileImage: require("../../../assets/png/icon/profile.png"),
      userName: "Healthy Boy",
      timeAgo: "19 min ago",
      requestMessage: "accepted your request."
    },
    {
      bookImage: require("../../../assets/png/book/book=crime.png"),
      profileImage: require("../../../assets/png/icon/profile.png"),
      userName: "Pum King",
      timeAgo: "19 min ago",
      requestMessage: "accepted someone else's request."
    },
    {
      bookImage: require("../../../assets/png/book/poem.png"),
      profileImage: require("../../../assets/png/icon/profile.png"),
      userName: "Hot Dog",
      timeAgo: "2 days ago",
      requestMessage: "sent a request to your book."
    },
  ];

  return (
    <View style={styles.notification}>
      <View style={[styles.bar, styles.barPosition]}>
        <Text style={[styles.title, styles.okTypo]}>Notification</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {requests.map((request, index) => (
          <BookRequestItem
            key={index}
            bookImage={request.bookImage}
            profileImage={request.profileImage}
            profileEmoji={request.profileEmoji}
            userName={request.userName}
            timeAgo={request.timeAgo}
            requestMessage={request.requestMessage}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    top: 60,
    width: "100%",
  },
  barPosition: {
    top: 0,
    height: 60,
    left: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: Color.containerWhite,
  },
  okTypo: {
    fontFamily: FontFamily.heading02Bold,
    fontWeight: "700",
  },
  title: {
    marginLeft: -57,
    top: 18,
    lineHeight: 30,
    textAlign: "center",
    zIndex: 3,
    color: Color.colorBlack,
    fontSize: FontSize.heading02Bold_size,
    left: "50%",
    position: "absolute",
  },
  notification: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.containerWhite,
  },
});

export default HomeNotification;
