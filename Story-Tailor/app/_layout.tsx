import React from "react";
import { Button, Text, StyleSheet, SafeAreaView, View } from "react-native";

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { Amplify } from "aws-amplify";

import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  const SignOutButtonDELETE = () => {
    const colorScheme = useColorScheme();
    return (  
      <View>
        {/* <Text>Welcome to the app!</Text> */}
        <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
          </Stack>

        {/* <Button title="Sign Out" onPress={signOut} /> */}
      </View>
  
    );
  };

  
  const MainStack = () => {
    // const { signOut } = useAuthenticator();
    const colorScheme = useColorScheme();
    return (  

      <>
      
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
  
      </>
  
    );
  };


  
  return (

    <Authenticator.Provider>
      <Authenticator>


          <MainStack />


      </Authenticator>
    </Authenticator.Provider>


  );
}



const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  imageContainer: {
    marginTop: 0, // Set the top margin of 55 pixels
    // width: '100%', // Full width of the screen
    // width: width, // Full width of the screen
    // alignItems: 'center',  // Center the image horizontally
    // justifyContent: 'center', // Center the content vertically (if necessary)
    // height: 100, // Set a height to cover the top area (adjust as necessary)
  },
  storyTailorLogo: {
    width: '100%', // Set the image width to fill the entire screen width
    // width: width, // Full width of the screen
    // width: 420, // Full width of the screen
    height: 310, // Set a height to cover the top area (adjust as necessary)
    // height: height, // Set a height to cover the top area (adjust as necessary)
    resizeMode: 'stretch', // Make sure the image fills the space proportionally
    // resizeMode: 'cover', // Make sure the image fills the space proportionally
  },
  howitworksvideo: {
    width: '100%', // Set the width of the image
    alignItems: 'center',
    // justifyContent: 'center',
    height: 210, // Set the height of the image
    resizeMode: 'stretch', // Ensures the image fits within the space
    marginRight: 0, // Optional: Add spacing to separate from text
    marginLeft: 0, // Optional: Add spacing to separate from text
    // marginTop: 10, // Optional: Add spacing to separate from text
    // marginTop: 10, // Optional: Add spacing to separate from text
  },
  signout: {
    borderColor: '#007bff',
    borderWidth: 2, 
    borderRadius: 8,
    backgroundColor: '#007bff',
    paddingVertical: 1,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    marginBottom: 1,

  },
  signOutButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


});


