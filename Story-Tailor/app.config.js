import 'expo-env';

export default {
  "expo": {
    "name": "Story Tailor",
    "slug": "Story-Tailor",
    "version": "1.6.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "storytailor",
    "jsEngine": "hermes",
    "userInterfaceStyle": "automatic",
    "owner": "bybraincloud",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.bybraincloud.Story-Tailor",
      "buildNumber": "6"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.bybraincloud.StoryTailor"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false,  
      },
      "fact": process.env.EXPO_PUBLIC_FACT,
      "user_pool_id": process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
      "user_pool_client_id": process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
      "identity_pool_id": process.env.EXPO_PUBLIC_COGNITO_IDENTITY_POOL_ID,
      "aws_region": process.env.EXPO_PUBLIC_COGNITO_REGION,
      "url": process.env.EXPO_PUBLIC_URL,
      "eas": {
        "projectId": "4fdc003f-4775-470e-9499-f2e0f3494fba"
      }
    }
  }
};

