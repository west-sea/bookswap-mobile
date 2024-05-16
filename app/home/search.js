import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import inputSearch from "../../components/input/InputSearch";


export default function Search() {
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
    <View>
        <inputSearch />
    </View>
  );
}

const styles = StyleSheet.create({
    
});