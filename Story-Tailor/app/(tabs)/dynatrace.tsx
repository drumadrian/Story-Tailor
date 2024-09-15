import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Dimensions, TouchableOpacity, Linking } from 'react-native';

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
        <ThemedText type="title">Monitoring and Observability</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Full-Stack Monitoring & Tracing</ThemedText>
        <ThemedText>
        Dynatrace provides comprehensive full-stack monitoring, which allows you to track the performance of your React Native app across all layers, including frontend, backend, and infrastructure. For both health data and finance data, this ensures that all requests, transactions, and user interactions are traced end-to-end. 
        
        {'\n'}{'\n'}
        <ThemedText type="subtitle">Here’s how it relates</ThemedText>
        {'\n'}{'\n'}
        •	<ThemedText type="defaultSemiBold">Health Data:</ThemedText> Ensures that health-related data (like medical records or personal health metrics) are processed securely and with low latency. Any anomalies or performance degradations can be tracked, helping ensure compliance with health regulations like HIPAA.
        {'\n'}{'\n'}
        •	<ThemedText type="defaultSemiBold">Finance Data:</ThemedText> Monitors transactions and sensitive financial operations to ensure data integrity and real-time response times. Any performance bottlenecks can be identified and addressed before they affect users.

        </ThemedText>

      </ThemedView>

      <ThemedView style={styles.githubLinkContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/drumadrian/Story-Tailor')}>
          <Ionicons size={100} name="code-working-outline" style={styles.githubLinkContainer} />
          <ThemedText>
            <ThemedText type="subtitle">GitHub Code {'\n'} </ThemedText>
          </ThemedText>
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
  githubLinkContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
  },

});


