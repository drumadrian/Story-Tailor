import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

// import { Logger } from 'aws-amplify';
// const logger = new Logger('AmplifyLogger');

Amplify.configure(awsExports);
console.log('Amplify Configured');

export default function Layout() {
  const saveUserToSecureStore = async (username: string) => {
    try {
      await SecureStore.setItemAsync('user', username);
    } catch (error) {
      console.error('Error storing user securely:', error);
    }
  };

  return (
    <Authenticator.Provider>
      <Authenticator>
        {({ signOut, user }) => {
          useEffect(() => {
            if (user) {
              saveUserToSecureStore(user.username);
            }
          }, [user]);

          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Hello, {user?.username}</Text>
              <Button title="Sign Out" onPress={signOut} />
            </View>
          );
        }}
      </Authenticator>
    </Authenticator.Provider>
  );
}