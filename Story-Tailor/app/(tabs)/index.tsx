import { Image, StyleSheet, Platform, View, Dimensions, Linking, TouchableOpacity } from 'react-native';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window'); // Get the screen width
const { height } = Dimensions.get('window'); // Get the screen width


export default function HomeScreen() {
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

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">How it works</ThemedText>
      </ThemedView>

      <ThemedView style={styles.howitworksvideo}>
            <Image
              source={require('@/assets/images/youtubethumbnail.png')}  // Replace with your image path
              style={styles.howitworksvideo}  // Style for the image
            />

          <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/99qoy-TRxHg?si=PsUTGie7J_hIDvWc')}>
            <ThemedText type="defaultSemiBold"> Watch on YouTube</ThemedText>
          </TouchableOpacity>

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

});


