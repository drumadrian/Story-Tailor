import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Button, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import * as React from 'react';


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';


export default function TabThreeScreen() {
  const [contextDuration, setcontextDuration] = React.useState('day');
  const [generatedStory, setgeneratedStory] = React.useState('');
  const [Name, setName] = React.useState('');

  // const [messages, setMessages] = useState([]);
  


  
  const updateContextDuration = (value: string) => {
    setcontextDuration(value);
    console.log('RadioButton value changed to:', value)
  };
  


  const generateStory = async () => {
    // Generate a story from the library
    console.log('generateStory button pressed');
    
    const contextDurationObject = {"contextDuration": contextDuration, "name": Name}
    const contextDurationObjectString = JSON.stringify(contextDurationObject);
    
    console.log("contextDurationObject:", contextDurationObject);

      // AWS Bedrock to host the Brain Cloud LLM
      try {
          console.log("contextDuration:", contextDuration);
          const response = await fetch("https://gujufqni65c7opvj5yjbw76plm0bnxfj.lambda-url.us-west-2.on.aws/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: contextDurationObjectString,
          });
  
          const generateStoryResponse = await response.text();
          console.log("generateStoryResponse:", generateStoryResponse);
          setgeneratedStory(generateStoryResponse);
  
      } catch (error) {
          console.error("Error:", error);
      }
  
  };
  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={200} name="book-outline" style={styles.headerImage} />}>
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

      <RadioButton.Group
        onValueChange={updateContextDuration}
        value={contextDuration}
      >
        <RadioButton.Item label="1 Day" value='day' />
        <RadioButton.Item label="1 Week" value='week' />
        <RadioButton.Item label="1 Month" value='month' />
        <RadioButton.Item label="1 Year" value='year' />
        <RadioButton.Item label="Lifetime" value='all' />
      </RadioButton.Group>

      </ThemedView>

      <ThemedView style={{ margin: 0 }}>
      <ThemedText type="defaultSemiBold">Prepended Prompt:</ThemedText>
      <ThemedText type="default">Generate sentiment analysis of all my information and emotions.  {'\n'}Then Give me a story in the bible similar to what I am going through. </ThemedText>
      </ThemedView>


      <ThemedView style={styles.generatestory}> 
      <Button title="Generate a story from the library" onPress={generateStory}/>
      {/* add progress bar here */}
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
};





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
    // marginVertical: 20, // Adjust the spacing above and below the TextInput
    paddingHorizontal: 10, // Optional: Padding around the input field
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
  generatestory: {
    borderColor: '#ccc', // Light gray border color
    borderWidth: 5, // Border width of the input field
    borderRadius: 5, // Rounded corners for the input field
    backgroundColor: '#ccc', // White background for the input field
    color: '#000', // Text color
  },

});



