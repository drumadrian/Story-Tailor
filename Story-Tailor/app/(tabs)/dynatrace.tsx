import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Dimensions } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window'); // Get the screen width

export default function TabFourScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f7fbfc', dark: '#343e47' }}
      headerImage={
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/StoryTailor.png')}
            style={styles.headerImage}
          />
        </View>

      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How to use Story Tailor</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold"> Tap </ThemedText> on  <ThemedText type="defaultSemiBold">Story Tailor </ThemedText> tab and generate a story.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Personalize </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold"> Tap </ThemedText> on  <ThemedText type="defaultSemiBold">Secure Data </ThemedText> tab and provide context to the Story Tailor.
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
    marginTop: 55, // Set the top margin of 55 pixels
    width: '100%', // Full width of the screen
    alignItems: 'center',  // Center the image horizontally
    justifyContent: 'center', // Center the content vertically (if necessary)
  },
  headerImage: {
    width: width, // Set the image width to fill the entire screen width
    height: 200, // Set a height to cover the top area (adjust as necessary)
    resizeMode: 'stretch', // Make sure the image fills the space proportionally
  },
});


