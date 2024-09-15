import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';






export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="accessibility-outline" style={styles.headerImage} />}>



      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Secure Data</ThemedText>
      </ThemedView>
      <ThemedText>This app sends Encrypted Data to the cloud <Ionicons name="cloud-upload-outline" style={styles.headerImage} /> </ThemedText>


      <Collapsible title="Name">
        <ThemedText>
          Your name is a unique <ThemedText type="defaultSemiBold">keyword</ThemedText> and identifies you in your story{' '}
        </ThemedText>
        <ExternalLink href="https://adriandrummond.com/storytailor">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name here"
          placeholderTextColor="#888"
        />
      </ThemedView>


      <Collapsible title="Age">
        <ThemedText>
          Your age is a unique <ThemedText type="defaultSemiBold">parameter</ThemedText> and personalizes you in your story{' '}
        </ThemedText>
        <ExternalLink href="https://adriandrummond.com/storytailor">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your age here"
          placeholderTextColor="#888"
        />
      </ThemedView>



      <Collapsible title="How do you feel">
        <ThemedText>
        <ThemedText type="defaultSemiBold"> Your emotion at this moment...{'\n'} </ThemedText>
        <ThemedText type="defaultSemiBold">Emotion</ThemedText>  are short-lived feelings that come from a known cause, while moods are feelings that are longer lasting than emotions and have no clear starting point of formation. 
          {'\n'} <ThemedText type="defaultSemiBold">Emotion</ThemedText> data provides a simply logical way to make sense of feelings
        </ThemedText>
        <ExternalLink href="https://www.6seconds.org/2022/03/13/plutchik-wheel-emotions">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter emotion here"
          placeholderTextColor="#888"
        />
      </ThemedView>




      <Collapsible title="Personal Journal Entry">
      <ThemedText style={styles.inputContainerJournal}>
        Reflect on your day or a recent experience, and describe how your emotions shaped your thoughts or actions. 
        Feel free to note any triggers, changes in your mood, or anything significant about the way you felt during the moment.
        This helps Story Tailor tailor its content more personally to your emotional journey.
      </ThemedText>

        <ExternalLink href="https://www.6seconds.org/2022/03/13/plutchik-wheel-emotions">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={styles.inputContainerJournal}>
        <TextInput
          multiline
          numberOfLines={100}
          maxLength={1000}
          style={styles.input}
          placeholder="Your secure Journal Entry"
          placeholderTextColor="#888"
        />
      </ThemedView>






    </ParallaxScrollView>
  );
}









const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    // marginVertical: 20, // Adjust the spacing above and below the TextInput
    paddingHorizontal: 10, // Optional: Padding around the input field
  },
  inputContainerJournal: {
    // marginVertical: 20, // Adjust the spacing above and below the TextInput
    paddingHorizontal: 10, // Optional: Padding around the input field
    // height: 200, // Height of the TextInput
  },
  input: {
    height: 40, // Height of the TextInput
    borderColor: '#ccc', // Light gray border color
    borderWidth: 1, // Border width of the input field
    paddingHorizontal: 10, // Padding inside the input field
    borderRadius: 5, // Rounded corners for the input field
    backgroundColor: '#fff', // White background for the input field
    color: '#000', // Text color
  },

});
