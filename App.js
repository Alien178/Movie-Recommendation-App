import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { RFValue } from "react-native-responsive-fontsize";

import HomeScreen from "./screens/HomeScreen";
import PopularScreen from "./screens/PopularScreen";
import RecommendationScreen from "./screens/RecommendationScreen";

export default function App() {
  return <AppContainer />;
}

const AppTopNavigator = createMaterialTopTabNavigator({
  RecommendedMovies: {
    screen: RecommendationScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
      tabBarOptions: {
        tabBarStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" },
      },
    },
  },
  PopularMovies: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarOptions: {
        tabBarStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" },
      },
    },
  },
});

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    AppTopNavigator: {
      screen: AppTopNavigator,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "#fff",
        headerTitle: "Recommended Movies",
        headerStyle: {
          backgroundColor: "#d500f9",
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: RFValue(18),
        },
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppStackNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
