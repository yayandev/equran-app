import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "#B121BF" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: "Quran",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="book-reader"
              size={24}
              color={focused ? "#B121BF" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="person-praying"
              size={24}
              color={focused ? "#B121BF" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
