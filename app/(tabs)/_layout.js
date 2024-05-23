import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import HomeHeader from "../../components/home/HomeHeader";
import BookSwapTitle from "../../assets/svg/brand/Type.svg";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useSession } from "../../contexts/auth.ctx";
import { SocketProvider } from "../../contexts/socket.ctx";
import Splash from "../../components/brand/Splash";

export default function TabLayout() {
  const { i18n } = useTranslation();
  const { token, isLoading } = useSession();

  if (isLoading) return <Splash />;

  if (!token) {
    return <Redirect href="/auth" />;
  }

  return (
    <SocketProvider token={token}>
      <Tabs
        initialRouteName="home/index"
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: "black",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
          tabBarStyle: {
            height: 60,
            paddingVertical: 8,
          },
          tabBarLabelStyle: {
            paddingBottom: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            tabBarLabel: i18n.t("tabs.home"),
            headerTitleStyle: { display: "none" },
            headerLeft: () => <BookSwapTitle />,
            headerRight: HomeHeader,
            headerRightContainerStyle: {
              paddingRight: 4,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={color === "black" ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home/search"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="home/notifications"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="message/index"
          options={{
            title: i18n.t("tabs.message"),
            tabBarLabel: i18n.t("tabs.message"),
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={
                  color === "black" ? "message-text" : "message-text-outline"
                }
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="message/chat"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => {
              return (
                <Pressable
                  {...props}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 4,
                  }}
                >
                  <AntDesign name="pluscircle" size={36} color="green" />
                </Pressable>
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookshelf/index"
          options={{
            tabBarLabel: i18n.t("tabs.books"),
            title: i18n.t("tabs.books"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={color === "black" ? "book" : "book-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookshelf/requests"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: i18n.t("tabs.profile"),
            tabBarLabel: i18n.t("tabs.profile"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name={color === "black" ? "user-alt" : "user"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/edit"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile/edit-genres"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile/my-exchanges"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile/about"
          options={{
            href: null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
      </Tabs>
    </SocketProvider>
  );
}
