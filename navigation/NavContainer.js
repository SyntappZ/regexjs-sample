import React, { useEffect, uesState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import allActions from "../store/actions";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DocsScreen from "../views/DocsScreen";
import TesterScreen from "../views/TesterScreen";
import HistoryScreen from "../views/HistoryScreen";
import ModalContainer from "./ModalContainer";
import { useSelector, useDispatch } from "react-redux";
const Tab = createMaterialTopTabNavigator();

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Modal"
        component={ModalContainer}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

const Tabs = () => {
  const {
    mediumColor,
    lightColor,
    mainColor,
    secondaryColor,
    status,
    tabsColor,
    inactiveTintColor,
    activeColor,
  } = useSelector((state) => state.themeReducer.themeColors);
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: activeColor,
        inactiveTintColor: inactiveTintColor,
        showIcon: true,
        labelStyle: {
          textTransform: "capitalize",
        },
        pressColor: secondaryColor,
        style: {
          backgroundColor: tabsColor,
        },
        indicatorStyle: {
          height: 0,
        },
      }}
    >
      <Tab.Screen
        name="Docs"
        component={DocsScreen}
        options={{
          tabBarLabel: "Docs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tester"
        component={TesterScreen}
        options={{
          tabBarLabel: "Tester",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavContainer = () => {
  const {
    darkColor,
    mediumColor,
    lightColor,
    mainColor,
    secondaryColor,
    status,
    highlightColor,
  } = useSelector((state) => state.themeReducer.themeColors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.fetchThemeFromStorage());
    dispatch(allActions.fetchHistoryFromStorage());
    dispatch(allActions.fetchSavedFromStorage());
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: darkColor,
    },
  };
  return (
    <View style={styles.main}>
      <StatusBar style={status} backgroundColor={highlightColor} />
      <NavigationContainer theme={MyTheme}>
        <RootStackScreen />
      </NavigationContainer>
    </View>
  );
};



export default NavContainer;
