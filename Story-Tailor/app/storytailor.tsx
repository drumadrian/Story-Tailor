import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';
import * as React from 'react';

export default function TabThreeScreen() {
  const [contextDuration, setcontextDuration] = React.useState('day');
  const [generatedStory, setgeneratedStory] = React.useState('');
  const [Name, setName] = React.useState('Adrian');
  const [isPressed, setIsPressed] = useState(false); // State for button press
  const [isLoading, setIsLoading] = useState(false); // State for loading animation

  const updateContextDuration = (value: string) => {
    setcontextDuration(value);
    console.log('RadioButton value changed to:', value);
  };

  const generateStory = async () => {
    setIsLoading(true); // Start loading animation
    console.log('generateStory button pressed');

    const contextDurationObject = { contextDuration, name: Name };
    const contextDurationObjectString = JSON.stringify(contextDurationObject);
    console.log("contextDurationObject:", contextDurationObject);

    try {
      const response = await fetch(
        "https://gujufqni65c7opvj5yjbw76plm0bnxfj.lambda-url.us-west-2.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: contextDurationObjectString,
        }
      );

      const generateStoryResponse = await response.text();
      console.log("generateStoryResponse:", generateStoryResponse);
      setgeneratedStory(generateStoryResponse);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={200} name="book-outline" style={[styles.headerImage, { color: '#ADD8E6' }]} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Personal Library</ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name here"
          placeholderTextColor="#888"
          value={Name}
          onChangeText={setName}
        />
      </ThemedView>

      <ThemedView style={{ margin: 20 }}>
        <ThemedText type="defaultSemiBold">Select the context duration:</ThemedText>
        <RadioButton.Group onValueChange={updateContextDuration} value={contextDuration}>
          <RadioButton.Item label="1 Day" value="day" />
          <RadioButton.Item label="1 Week" value="week" />
          <RadioButton.Item label="1 Month" value="month" />
          <RadioButton.Item label="1 Year" value="year" />
          <RadioButton.Item label="Lifetime" value="all" />
        </RadioButton.Group>
      </ThemedView>

      <ThemedView style={{ margin: 0 }}>
        <ThemedText type="defaultSemiBold">Prepended Prompt:</ThemedText>
        <ThemedText type="default">
          Generate sentiment analysis of all my information and emotions. {'\n'}
          Then Give me a story in Greek Mythology similar to what I am going through.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.generatestory}>
        <TouchableOpacity style={styles.button} onPress={generateStory} disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? "Generating..." : "Generate a story from the library"}
          </Text>
        </TouchableOpacity>

        {/* Loading Spinner */}
        {isLoading && <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />}
      </ThemedView>

      <ThemedText type="defaultSemiBold">Please allow up to 60 seconds for your story to be generated.</ThemedText>

      <ThemedView style={{ margin: 20 }}>
        <ThemedText type="defaultSemiBold">Generated Story:</ThemedText>
        <TextInput
          style={{ height: 1000, borderColor: 'white', borderWidth: 1 }}
          multiline
          editable={false}
          value={generatedStory}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: 0,
    left: 100,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  generatestory: {
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: '#004799',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 20,
  },
});