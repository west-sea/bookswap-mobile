import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { Padding, FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { router } from "expo-router";
import LeftArrow from "../../assets/svg/icon/arrow_left.svg";
import BookList from "../../components/book/BooklistItem"; // Adjust the path if needed

const images = {
    image5: require("../../assets/png/book/book=a little life.png"),
    image6: require("../../assets/png/book/poem.png"),
    image4: require("../../assets/png/book/book=small things.png"),
};

const books = [
    { title: "A Little Life", author: "Yanagihara, Hanya", genre: "Novel", image: 'image5' },
    { title: "Poems", author: "Louise Gluck", genre: "Poetry", image: 'image6' },
    { title: "Small Things Like These", author: "Claire Keegan", genre: "Novel", image: 'image4' },
];

export default function Search() {
    const [searchText, setSearchText] = useState("");

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

    // 입력된 텍스트에 따라 책 목록 필터링
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={[styles.typesearch, styles.typetitlePosition]}>
                <Pressable
                    style={[styles.md24ArrowLeft, styles.md24Layout]}
                    onPress={() => handlePress()}
                >
                    <LeftArrow />
                </Pressable>
                <View style={[styles.input4, styles.inputBorder]}>
                    <TextInput
                        style={[styles.input1, styles.tag2Typo]}
                        placeholder="Search"
                        placeholderTextColor={Color.iconOnLightDisable}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <BookList filteredBooks={filteredBooks} images={images} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.containerWhite,
    },
    typesearch: {
        top: 0,
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
    scrollContainer: {
        marginTop: 80, // 검색 바 아래에 컨텐츠를 표시하기 위해 여유 공간을 둠
    },
});

