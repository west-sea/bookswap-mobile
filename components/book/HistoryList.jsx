import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Padding, Border, Color, FontSize, FontFamily } from "../../GlobalStyles";

const HistoryList = ({ historyItems }) => {
    return (
        <View style={styles.historyList}>
            {historyItems.map((item, index) => (
                <View key={index} style={styles.bookItem}>
                    <View style={[styles.frameParent, styles.navigationFlexBox]}>
                        <View style={styles.frameGroup}>
                            <View style={styles.bookImgParent}>
                                <View style={styles.bookImg}>
                                    <Image
                                        style={[styles.image5Icon, styles.image5IconPosition]}
                                        contentFit="cover"
                                        source={item.book1.image}
                                    />
                                    <View style={[styles.bookImgChild, styles.image5IconPosition]} />
                                </View>
                                <View style={[styles.lg32Profile, styles.lg32Layout]}>
                                    <View style={[styles.circle, styles.circlePosition]} />
                                    <Text style={styles.text}>{item.user1}</Text>
                                </View>
                            </View>
                            <View style={styles.titleParent}>
                                <Text style={[styles.title, styles.titleFlexBox]} numberOfLines={1}>
                                    {item.book1.title}
                                </Text>
                                <Text style={[styles.author, styles.titleFlexBox]} numberOfLines={1}>
                                    {item.book1.author}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.frameContainer}>
                            <View style={styles.bookImgParent}>
                                <View style={styles.bookImg}>
                                    <Image
                                        style={[styles.image5Icon, styles.image5IconPosition]}
                                        contentFit="cover"
                                        source={item.book2.image}
                                    />
                                    <View style={[styles.bookImgChild, styles.image5IconPosition]} />
                                </View>
                                <View style={[styles.lg32Profile1, styles.lg32Layout]}>
                                    <View style={[styles.circle1, styles.circlePosition]} />
                                    <Text style={[styles.text1, styles.text1Typo]}>{item.user2}</Text>
                                </View>
                            </View>
                            <View style={styles.titleParent}>
                                <Text style={[styles.title, styles.titleFlexBox]} numberOfLines={1}>
                                    {item.book2.title}
                                </Text>
                                <Text style={[styles.author, styles.titleFlexBox]} numberOfLines={1}>
                                    {item.book2.author}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.swappedWithBrunoContainer} numberOfLines={1}>
                        <Text style={styles.text1Typo1}>{`Swapped with `}</Text>
                        <Text style={styles.titleTypo}>{item.swapWith}</Text>
                        <Text style={styles.text1Typo1}>{` on ${item.date}`}</Text>
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bookItemSpaceBlock: {
        paddingVertical: Padding.p_3xs,
        paddingHorizontal: 0,
    },
    navigationFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    image5IconPosition: {
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
    titleFlexBox: {
        textAlign: "center",
        color: Color.iconOnLightActive,
        lineHeight: 18,
        fontSize: FontSize.subtitle03Regular_size,
        alignSelf: "stretch",
        overflow: "hidden",
    },
    text1Typo: {
        fontSize: FontSize.heading02Bold_size,
        textAlign: "left",
        color: Color.colorBlack,
    },
    image5Icon: {
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
    },
    bookImgChild: {
        borderStyle: "solid",
        borderColor: Color.colorGray_200,
        borderWidth: 1,
    },
    bookImg: {
        marginLeft: -40,
        width: 80,
        left: "50%",
        top: 0,
        height: 120,
        position: "absolute",
    },
    circle: {
        backgroundColor: Color.colorGray_100,
    },
    text: {
        marginTop: -9,
        marginLeft: -9,
        fontSize: FontSize.size_lg,
        textAlign: "left",
        color: Color.colorBlack,
        fontFamily: FontFamily.subtitle03Regular,
        fontWeight: "500",
        top: "50%",
        left: "50%",
        position: "absolute",
    },
    lg32Profile: {
        right: 0,
        top: "50%",
        position: "absolute",
        marginTop: -16,
        height: 32,
        width: 32,
        overflow: "hidden",
    },
    bookImgParent: {
        width: 112,
        height: 120,
        overflow: "hidden",
    },
    title: {
        fontFamily: FontFamily.subtitle02Bold,
        fontWeight: "700",
    },
    author: {
        fontFamily: FontFamily.subtitle03Regular,
        fontWeight: "500",
    },
    titleParent: {
        marginTop: 4,
        alignItems: "center",
        alignSelf: "stretch",
    },
    frameGroup: {
        alignItems: "center",
        flex: 1,
    },
    circle1: {
        backgroundColor: Color.colorDeepskyblue,
    },
    text1: {
        marginTop: -10,
        marginLeft: -10,
        fontFamily: FontFamily.subtitle03Regular,
        fontWeight: "500",
        top: "50%",
        position: "absolute",
        left: "50%",
    },
    lg32Profile1: {
        top: "50%",
        position: "absolute",
        marginTop: -16,
        height: 32,
        width: 32,
        overflow: "hidden",
        left: 0,
    },
    frameContainer: {
        borderRadius: Border.br_9xs,
        marginLeft: 8,
        alignItems: "center",
        flex: 1,
    },
    frameParent: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.container100,
        padding: Padding.p_3xs,
        alignItems: "center",
        alignSelf: "stretch",
    },
    text1Typo1: {
        fontFamily: FontFamily.subtitle03Regular,
        fontWeight: "500",
    },
    titleTypo: {
        fontFamily: FontFamily.subtitle02Bold,
        fontWeight: "700",
    },
    swappedWithBrunoContainer: {
        marginTop: 10,
        color: Color.iconOnLightEnable,
        lineHeight: 18,
        fontSize: FontSize.subtitle03Regular_size,
        textAlign: "left",
        alignSelf: "stretch",
        overflow: "hidden",
    },
    bookItem: {
        paddingTop: Padding.p_3xs,
        paddingBottom: Padding.p_7xs,
        paddingHorizontal: Padding.p_xl,
        alignSelf: "stretch",
        backgroundColor: Color.containerWhite,
    },
    historyList: {
        width: '100%',
        paddingVertical: Padding.p_3xs,
        backgroundColor: Color.containerWhite,
    },
});

export default HistoryList;
