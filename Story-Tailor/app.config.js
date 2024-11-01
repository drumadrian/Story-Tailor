import 'expo-dotenv';

export default {
  expo: {
    extra: {
      fact: 'kittens are cool',
      user_pool_id: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
      user_pool_client_id: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
      identity_pool_id: process.env.EXPO_PUBLIC_COGNITO_IDENTITY_POOL_ID,
      aws_region: process.env.EXPO_PUBLIC_COGNITO_REGION,
    },
  },
};