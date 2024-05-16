// BookList.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Padding, FontFamily, Border, FontSize, Color } from "../../GlobalStyles";

const Booklist = ({ filteredBooks, images }) => {
  return (
    <View>
      {filteredBooks.map((book, index) => (
        <View key={index} style={styles.bookItem}>
          <View style={styles.bookImg}>
            <Image
              style={[styles.image5Icon, styles.image5IconLayout]}
              contentFit="cover"
              source={images[book.image]}
            />
            <View style={[styles.bookImgChild, styles.image5IconPosition]} />
          </View>
          <View style={styles.frameParent}>
            <View style={styles.titleParent}>
              <Text style={styles.title}>{book.title}</Text>
              <Text style={[styles.author, styles.textTypo]}>{book.author}</Text>
              <Text style={[styles.novel, styles.textTypo]}>{book.genre}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  frameParent: {
    justifyContent: "space-between",
    marginLeft: 10,
    alignSelf: "stretch",
    flex: 1,
  },
  bookItem: {
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    alignSelf: "stretch",
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.containerWhite,
  },
  bookImgChild: {
    borderStyle: "solid",
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    position: "absolute",
  },
});

export default Booklist;
