import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PreviewScreen from "../screens/PreviewScreen";
import SandboxScreen from '../screens/SandboxScreen';
import SubcategoriesScreen from '../screens/SubcategoriesScreen';
import ContentScreen from "../screens/ContentScreen";
import BlueprintScreen from "../screens/BlueprintScreen";
import MessagesListScreen from '../screens/MessagesListScreen';


const AuthStackNavigator = createStackNavigator({
    Welcome: { screen: WelcomeScreen },
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
});

const KnowledgeStackNavigator = createStackNavigator({
  Knowledge: { screen: KnowledgeScreen },
  Subcategories: { screen: SubcategoriesScreen },
  Content: { screen: ContentScreen },
});

const ChatStackNavigator = createStackNavigator({
  MessagesList: { 
    screen: MessagesListScreen, 
    navigationOptions: ({ navigation }) => ({
      title: 'Messages',
      headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <View style={{ paddingHorizontal: 10 }}>
                  <Ionicons name="md-menu" size={32} />
              </View>
          </TouchableOpacity>
      ),
    }),
  },
  Chat: { screen: ChatScreen }
});

const AppTabNavigator = createBottomTabNavigator(
    {
      Sandbox: {
        screen: SandboxScreen,
        navigationOptions: {
          tabBarLable: 'Sandbox',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-home" size={28} color={tintColor} />
          ),
        },
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLable: 'Home',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-home" size={28} color={tintColor} />
          ),
        },
      },
      Blueprint: {
        screen: BlueprintScreen,
        tabBarLable: 'Blueprint',
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-book" size={28} color={tintColor} />
          ),
        },
      },
      // Chat: {
      //   screen: ChatScreen,
      //   navigationOptions: {
      //     tabBarIcon: ({ tintColor }) => (
      //       <Entypo name="chat" size={28} color={tintColor} />
      //     ),
      //   },
      // },
      Knowledge: {
        screen: KnowledgeStackNavigator,
        tabBarLable: 'Knowledge',
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <MaterialIcons name="book" size={28} color={tintColor} />
          ),
        },
      },
      // Preview: {
      //   screen: PreviewScreen,
      //   tabBarLable: 'Preview',
      //   navigationOptions: {
      //     tabBarIcon: ({ tintColor }) => (
      //       <Entypo name="magnifying-glass" size={28} color={tintColor} />
      //     ),
      //   },
      // },
      // Profile: {
      //   screen: ProfileScreen,
      //   navigationOptions: {
      //     tabBarIcon: ({ tintColor }) => (
      //       <Entypo name="user" size={28} color={tintColor} />
      //     ),
      //   },
      // },
    },
    {
      tabBarOptions: {
        activeTintColor: '#6200EE',
        inactiveTintColor: '#151515',
      },
    },
  );

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            title: '#thehub',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Ionicons name="md-menu" size={32} />
                    </View>
                </TouchableOpacity>
            ),
        }),
    },
});

const AppDrawerNavigator = createDrawerNavigator({
    Home: AppStackNavigator,
    Settings: { screen: SettingsScreen },
    Messages: ChatStackNavigator,
});

const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
    Knowledge: KnowledgeStackNavigator,
});

export default createAppContainer(AppNavigator);