import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Tabs, Redirect } from "expo-router";
import TabBar from "../../components/tabs/TabBar";
import { useSession } from "../../contexts/auth.ctx";
import Splash from "../../components/brand/Splash";
import { SocketProvider } from "../../contexts/socket.ctx";


export default function TabLayout() {
  const { token, isLoading } = useSession();

  if (isLoading) {
    return <Splash />;
  }

  if (!token) {
    return <Redirect href="/auth" />;
  }

  return (
    
    <SocketProvider token={token}>
    <Tabs
      initialRouteName="home"
      screenOptions={{ tabBarActiveTintColor: "black", header: () => <></> }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
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
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={color === "black" ? "message-text" : "message-text-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="pluscircle"
              size={36}
              color="green"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-books"
        options={{
          title: "My Books",
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name={color === "black" ? "user-alt" : "user"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    </SocketProvider>
  );
}
