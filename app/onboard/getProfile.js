import React, {useState} from "react";
import { View, Text, Button, StyleSheet, ScrollView, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = screenHeight * 0.1;

function Onboarding({navigation}) {
    const [nickname, setNickname] = useState(''); 

    const profiles = [
        { id: 1, img: require('../../assets/svg/onboard/logo.svg'), name: 'User1' },
        { id: 2, img: require('../../assets/svg/onboard/logo.svg'), name: 'User2' },
        { id: 3, img: require('../../assets/svg/onboard/logo.svg'), name: 'User3' },
        { id: 4, img: require('../../assets/svg/onboard/logo.svg'), name: 'User4' }
    ];

    const handlePress = () => {
        router.push({
            pathname: 'onboard/genre.js',
            params: {
                //img,
                //email,
                //name,
            },
        });
    };

    return (
        <View style={styles.frame}>
      <Text style={styles.heading}>Welcome to BookSwap!{'\n'}Let me know about you.</Text>
      <Text style={styles.text}>Profile</Text>
      <ScrollView
          contentContainerStyle={styles.contentContainer}
          horizontal={true} // 가로 스크롤 활성화
          style={styles.scrollView}
      >
        {profiles.map((profile) => (
                    <TouchableOpacity key={profile.id} style={styles.imageContainer} onPress={() => handlePress()}>
                        <Image source={profile.img} style={styles.image} />
                        <Text style={styles.text}>{profile.name}</Text>
                    </TouchableOpacity>
                ))}
      </ScrollView>
      <Text style={styles.text}>Nickname</Text>
      <TextInput
          //placeholder="Enter your nickname..."
            style={styles.input}
            onChangeText={setNickname} // 텍스트 변경 시 상태 업데이트
            value={nickname}
      />
      <View style={styles.buttonContainer}>
      <Button 
            title="Go to Main" 
            onPress={() => navigation.navigate('Onboarding2')}
            color={nickname ? '#40B250' : '#F2F3F7'} // 텍스트 입력에 따라 버튼 색상 변경
            disabled={!nickname}
        />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center', // 모든 요소를 가로 중앙 정렬
        justifyContent: 'center', // 세로 방향에서도 중앙 정렬 (필요한 경우)
        width: screenWidth, // 프레임의 가로 크기를 화면에 맞춤
        height: screenHeight // 프레임의 세로 크기를 화면에 맞춤
      },
    container: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      padding: '10px 20px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF' // 배경 색을 여기에 지정하세요.
    },
    heading: {
      color: '#0C0E12', // 이 색상 코드는 주어진 변수에 따라 변경될 수 있습니다.
      textAlign: 'center',
      marginTop: screenHeight*0.1,
      fontFamily: 'Inter',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 'bold',
      
      lineHeight: 30 // 150% of 20px
    },
    text: {
        color: '#0C0E12', // 이 색상 코드는 주어진 변수에 따라 변경될 수 있습니다.
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        //fontWeight: 700,
        lineHeight: 30 // 150% of 20px
      },
    contentContainer: {
        //alignSelf: 'center', // 항목들을 세로 중앙에 정렬
        padding: 10 // 컨텐츠 주변에 패딩 추가
      },
      scrollView: {
        height: screenHeight * 0.13
    },
      input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth - 40,
        height: 40, // 입력 필드의 높이 설정
        paddingHorizontal: 10, // 입력 필드 내부의 좌우 패딩
        borderRadius: 15, // 모서리 둥글기
        borderWidth: 1, // 테두리 두께
        borderColor: '#DEE1EB', // 테두리 색상
        backgroundColor: '#FFF', // 배경 색상
      },
      buttonContainer: {
        width: screenWidth - 40, // 버튼의 가로 길이를 조정하여 프레임에 맞춤
        marginTop: screenHeight*0.4,
        marginBottom: 20 // 하단 여백 추가
    }
  });

export default Onboarding;