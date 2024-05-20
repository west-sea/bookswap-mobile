import { View, Text, TouchableOpacity } from "react-native";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        if (route.name === "upload") {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("upload")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <options.tabBarIcon />
            </TouchableOpacity>
          );
        }
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <options.tabBarIcon
              size={24}
              color={isFocused ? "black" : "gray"}
            />
            <Text style={{ color: isFocused ? "black" : "gray" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
