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
  const [contextDuration, setcontextDuration] = React.useState('1 Day');
  const [generatedStory, setgeneratedStory] = React.useState('');

  // const [messages, setMessages] = useState([]);
  


  
  const updateContextDuration = (value: string) => {
    setcontextDuration(value);
    console.log('RadioButton value changed to:', value)
  };
  


  const generateStory = async () => {
    // Generate a story from the library
    // setgeneratedStory('Once upon a time...')
    console.log('generateStory button pressed')
    
  
      // AWS Bedrock to host the Brain Cloud LLM
      try {
          console.log("contextDuration:", contextDuration);
          const response = await fetch("https://gujufqni65c7opvj5yjbw76plm0bnxfj.lambda-url.us-west-2.on.aws/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: contextDuration,
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

      <ThemedView style={{ margin: 20 }}>
      <ThemedText type="defaultSemiBold">Select the context duration:</ThemedText>

      <RadioButton.Group
        onValueChange={updateContextDuration}
        value={contextDuration}
      >
        <RadioButton.Item label="1 Day" value="1 Day" />
        <RadioButton.Item label="1 Week" value="1 Week" />
        <RadioButton.Item label="1 Month" value="1 Month" />
        <RadioButton.Item label="1 Year" value="1 Year" />
        <RadioButton.Item label="Lifetime" value="Lifetime" />
      </RadioButton.Group>

      </ThemedView>

      <ThemedView style={{ margin: 0 }}>
      <ThemedText type="defaultSemiBold">Prepended Prompt:</ThemedText>
      <ThemedText type="default">Generate sentiment analysis of all my information and emotions.  {'\n'}Then Give me a story in the bible similar to what I am going through. </ThemedText>
      </ThemedView>



      <ThemedView style={{ margin: 20 }}>
      <Button title="Generate a story from the library" onPress={generateStory} />
      </ThemedView>

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
});



