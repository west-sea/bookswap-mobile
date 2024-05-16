import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";

export default function homeNotification() {
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
    <Text>home notification</Text>
  );
}

const styles = StyleSheet.create({
    
});