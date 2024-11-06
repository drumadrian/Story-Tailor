import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import Constants from "expo-constants";
// import outputs from "../amplify_outputs.json";


// Amplify configuration (using Constants values)
const fact = Constants.expoConfig.extra.fact;
const user_pool_id = Constants.expoConfig.extra.user_pool_id;
const user_pool_client_id = Constants.expoConfig.extra.user_pool_client_id;
const identity_pool_id = Constants.expoConfig.extra.identity_pool_id;
const aws_region = Constants.expoConfig.extra.aws_region;
const url = Constants.expoConfig.extra.url;

// console.log(fact);
// console.log(user_pool_id);
// console.log(user_pool_client_id);
// console.log(identity_pool_id);
// console.log(aws_region);
// console.log(url);


const amplifyConfig = 
  {
    "auth": {
        "aws_region": aws_region,
        "groups": [],
        "identity_pool_id": identity_pool_id,
        "mfa_configuration": "NONE",
        "mfa_methods": [],
        "password_policy": {
            "min_length": 8,
            "require_lowercase": true,
            "require_numbers": true,
            "require_symbols": true,
            "require_uppercase": true
        },
        "standard_required_attributes": [
            "email"
        ],
        "unauthenticated_identities_enabled": true,
        "user_pool_client_id": user_pool_client_id,
        "user_pool_id": user_pool_id,
        "user_verification_types": [
            "email"
        ],
        "username_attributes": [
            "email"
        ]
    },
    "data": {
        "authorization_types": [
            "AMAZON_COGNITO_USER_POOLS"
        ],
        "aws_region": aws_region,
        "default_authorization_type": "AWS_IAM",
        "model_introspection": {
          "version": 1,
          "models": {
            "Todo": {
              "name": "Todo",
              "fields": {
                "id": {
                  "name": "id",
                  "isArray": false,
                  "type": "ID",
                  "isRequired": true,
                  "attributes": []
                },
                "content": {
                  "name": "content",
                  "isArray": false,
                  "type": "String",
                  "isRequired": false,
                  "attributes": []
                },
                "createdAt": {
                  "name": "createdAt",
                  "isArray": false,
                  "type": "AWSDateTime",
                  "isRequired": false,
                  "attributes": [],
                  "isReadOnly": true
                },
                "updatedAt": {
                  "name": "updatedAt",
                  "isArray": false,
                  "type": "AWSDateTime",
                  "isRequired": false,
                  "attributes": [],
                  "isReadOnly": true
                }
              },
              "syncable": true,
              "pluralName": "Todos",
              "attributes": [
                {
                  "type": "model",
                  "properties": {}
                },
                {
                  "type": "auth",
                  "properties": {
                    "rules": [
                      {
                        "allow": "public",
                        "provider": "iam",
                        "operations": [
                          "create",
                          "update",
                          "delete",
                          "read"
                        ]
                      }
                    ]
                  }
                }
              ],
              "primaryKeyInfo": {
                "isCustomPrimaryKey": false,
                "primaryKeyFieldName": "id",
                "sortKeyFieldNames": []
              }
            }
          },
          "enums": {},
          "nonModels": {}
        },
            "url": url
    },
    "version": "1.3"
  };

  
// console.log("Amplify Config:", amplifyConfig);
// console.log("Amplify Outputs:", outputs);

Amplify.configure(amplifyConfig);


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Authenticator.Provider>
      <Authenticator>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="securedata"
              options={{
                title: 'Secure Data',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'accessibility' : 'accessibility-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="storytailor"
              options={{
                title: 'Story Tailor',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="dynatrace"
              options={{
                title: 'Dynatrace',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="signout"
              options={{
                title: 'Sign Out',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'exit' : 'exit-outline'} color={color} />
                ),
              }}
            />
          </Tabs>
        </ThemeProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
}