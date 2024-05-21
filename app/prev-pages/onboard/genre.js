import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions, Button } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const genres = ["Major", "Novel", "Essay", "Poetry", "Hobby", "Art", "Science", "Philosophy"];

function Onboarding2({navigation}) {
    const [selectedGenres, setSelectedGenres] = useState([]);

    let updatedGenres;
    if (selectedGenres.includes(genre)) {
        updatedGenres = selectedGenres.filter(g => g !== genre);
    } else {
        updatedGenres = [...selectedGenres, genre];
    }

    setSelectedGenres(updatedGenres);

    router.push({
        pathname: "/auth/welcome",
        params: {
          //userId: data.userId,
          //email,
          //name,
        },
      });



  return (
    <View style={styles.onboarding}>
        <View style={[styles.whatIsYourFavoriteGenreWrapper, styles.wrapperPosition]}>
        <Text style={[styles.whatIsYour, styles.tag1FlexBox]}>
          What is your favorite genre?
        </Text>
      </View>
      <Pressable style={styles.onboardingInner} onPress={() => {}}>
        <View style={styles.tagParent}>
          {genres.map((genre, index) => (
            <Pressable
              key={index}
              style={[
                styles.tagSpaceBlock,
                styles.tagWrapper,
                selectedGenres.includes(genre) ? styles.tagWrapperActive : null
              ]}
              onPress={() => handlePress(genre)}
            >
              <Text style={[
                styles.tagText,
                selectedGenres.includes(genre) ? styles.tagTextActive : null
              ]}>
                {genre}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
      <View style={styles.buttonContainer}>
      <Button 
            title="Complete" 
            onPress={() => handlePress()}
            color = {'#40B250'}
            //color={nickname ? '#40B250' : '#F2F3F7'} // 텍스트 입력에 따라 버튼 색상 변경
            //disabled={!nickname}
        />
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
    onboarding: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center'
    },
    onboardingInner: {
      padding: 20
    },
    tagParentSpaceBlock: {
      marginBottom: 20
    },
    tagParent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    tagSpaceBlock: {
      margin: 10
    },
    tagWrapper: {
      display: 'flex',
      height: 30,
      paddingHorizontal: 12,
      paddingVertical: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      backgroundColor: '#DEE1EB'  // Default background color
    },
    tagWrapperActive: {
      backgroundColor: '#6E7A9F'  // Active background color
    },
    tagText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000'  // Default text color
    },
    tagTextActive: {
      color: '#FFF'  // Active text color
    },
    sm18Message: {
      width: 50,
      height: 50
    },
    whatIsYourFavoriteGenreWrapper: {
      //marginTop: 20
      marginTop: screenHeight*0.1,
      marginBottom: screenHeight*0.03
    },
    wrapperPosition: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    whatIsYour: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    buttonLgWrapper: {
      marginTop: 20
    },
    buttonLg: {
      padding: 10,
      backgroundColor: '#6E7A9F',
      borderRadius: 20
    },
    button: {
      fontSize: 16,
      color: '#FFF'
    },
    buttonContainer: {
        width: screenWidth - 40, // 버튼의 가로 길이를 조정하여 프레임에 맞춤
        marginTop: screenHeight*0.4,
        marginBottom: 20 // 하단 여백 추가
    }
  });
  

export default Onboarding2;