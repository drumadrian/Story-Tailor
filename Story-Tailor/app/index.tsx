import { Image, StyleSheet, View, Dimensions, Linking, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useAuthenticator } from "@aws-amplify/ui-react-native";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [isPressed, setIsPressed] = useState(false);

  // Define signOut inside the component so it has access to hooks
  // const { signOut } = useAuthenticator();

  // const signOut = () => {
  //   setIsPressed(true);
  //   setTimeout(() => {
  //     setIsPressed(false);
  //   }, 4);
  // };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f7fbfc', dark: '#343e47' }}
      headerImage={
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/StoryTailorLogo.png')}
            style={styles.storyTailorLogo}
          />
        </View>
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How to use Story Tailor</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold"> Tap </ThemedText> on <ThemedText type="defaultSemiBold">Story Tailor </ThemedText> tab and generate a story.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Personalize </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold"> Tap </ThemedText> on <ThemedText type="defaultSemiBold">Secure Data </ThemedText> tab and provide context to the Story Tailor.
          You can share as much or as little as you want.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a Personalized story</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">How it works</ThemedText>
      </ThemedView>

      <ThemedView style={styles.howitworksvideo}>
        <Image
          source={require('@/assets/images/youtubethumbnail.png')}
          style={styles.howitworksvideo}
        />
        <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/99qoy-TRxHg?si=PsUTGie7J_hIDvWc')}>
          <ThemedText type="defaultSemiBold"> Watch on YouTube</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* <ThemedView style={styles.howitworksvideo}>
        <Button title="Sign Out" onPress={signOut} />
      </ThemedView> */}
    </ParallaxScrollView>
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
    marginTop: 0,
  },
  storyTailorLogo: {
    width: '100%',
    height: 310,
    resizeMode: 'stretch',
  },
  howitworksvideo: {
    width: '100%',
    alignItems: 'center',
    height: 210,
    resizeMode: 'stretch',
    marginRight: 0,
    marginLeft: 0,
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