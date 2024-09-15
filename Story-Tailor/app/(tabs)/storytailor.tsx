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



const handleGenerateStory = () => {
  // Generate a story from the library
  // This function will be implemented in the next step
  console.log('handleGenerateStory() Once upon a time...')
};

const handleOnValueChange = (value: string) => {
  console.log('RadioButton value changed')
};


export default function TabThreeScreen() {
  const [value, setValue] = React.useState('1 Day');
  const [generatedStory, setgeneratedStory] = React.useState('');

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
        onValueChange={handleOnValueChange}
        value={value}
      >
        <RadioButton.Item label="1 Day" value="1 Day" />
        <RadioButton.Item label="1 Week" value="1 Week" />
        <RadioButton.Item label="1 Month" value="1 Month" />
        <RadioButton.Item label="1 Year" value="1 Year" />
        <RadioButton.Item label="Lifetime" value="Lifetime" />
      </RadioButton.Group>


      </ThemedView>

      <ThemedView style={{ margin: 20 }}>
      <Button title="Generate a story from the library" onPress={handleGenerateStory} />
      </ThemedView>

      <ThemedView style={{ margin: 20 }}>
      <ThemedText type="defaultSemiBold">Generated Story:</ThemedText>
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
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



