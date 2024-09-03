import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function TabLayout() {
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"white",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              IconComponent={Ionicons}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              IconComponent={AntDesign}
              name={focused ? "checkcircle" : "checkcircleo"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              IconComponent={FontAwesome}
              name={focused ? "user" : "user-o"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
