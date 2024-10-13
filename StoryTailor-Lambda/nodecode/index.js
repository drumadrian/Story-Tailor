import axios from 'axios'; // Ensure axios is installed
import https from 'https';
import { defaultProvider } from '@aws-sdk/credential-provider-node'; // For obtaining credentials automatically
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { Sha256 } from '@aws-crypto/sha256-browser';

const debug = true;

export const handler = async (event) => {
  if (debug) {
    console.log("event:", event);
  }
  
// Declare eventObject outside of the if-else block
let eventObject;

// Extract the context duration and username from the event object
if (typeof event === 'string') {
  eventObject = JSON.parse(event.body);
} else {
  eventObject = event.body;
}

const contextDuration = eventObject.contextDuration;
const username = eventObject.name;

  if (debug) {
    console.log("contextDuration:", contextDuration);
    console.log("name:", username);
  }

  // Call the function to query OpenSearch, passing the context duration and username
  const queryOpenSearchResults = await queryOpenSearch(contextDuration, username);  

  // Combine the hits into a single string
  const context = await combineHits(queryOpenSearchResults); 

  if (debug) {
    console.log("Combined context:", context);
  }

  const bookName = "The Bible";

  // Construct the prompt for the API
  const promptPart1 = "Give me a sentiment analysis of all my information and my emotions using the context I have provided. The context is what I'm going through right now. ";
  const promptPart2 = "Give me a story based on the wisdom of the book named " + bookName + " that will help me feel better. ";
  const promptPart3 = "The time duration of this context is: " + contextDuration + ". ";
  const promptPart4 = "What I'm going through is: " + context;

  const storyprompt = promptPart1 + promptPart2 + promptPart3 + promptPart4;

  if (debug) {
    console.log("storyprompt:", storyprompt);
  }

  // Call OpenAI API with the constructed prompt
  let completionText = await invokeModel(storyprompt);

  // Return the response
  const response = {
    statusCode: 200,
    body: completionText,
  };
  return response;
};

// Function to call OpenAI API with GPT-4 model
async function invokeModel(prompt) {
  const apiKey = process.env.OPENAI_API_KEY; // Store your API key securely in environment variables
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint for ChatGPT models

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-4', // You can also use 'gpt-4-32k' if needed for larger contexts
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' }, // Optional system message
          { role: 'user', content: prompt }, // The user prompt
        ],
        max_tokens: 4000, // Adjust max tokens as needed (within model's limits)
        temperature: 0.7, // Adjust to control randomness in responses
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const completion = response.data.choices[0].message.content.trim();
    if (debug) {
      console.log("completion:", completion);
    }
    return completion;

  } catch (error) {
    console.error("Error invoking OpenAI API:", error.response ? error.response.data : error.message);
    return "Sorry, there was an error generating the response.";
  }
}

/**
 * Function to query data within specific time ranges and for a specific username
 * @param {string} range - Time range ('day', 'week', 'month', 'year', 'all')
 * @param {string} username - The username to filter the query by
 */
async function queryOpenSearch(range, username) {
  // Replace with your OpenSearch domain and index
  const domain = 'search-storytailor2-y3v3y3gbfsfuyznpjhnvwx6vde.aos.us-west-2.on.aws';
  const indexName = 'securedata';
  const region = 'us-west-2'; // Your AWS region

  const end = new Date().toISOString(); // Current time in ISO 8601 format
  let start;

  switch (range) {
    case 'day':
      start = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Last 24 hours
      break;
    case 'week':
      start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // Last 7 days
      break;
    case 'month':
      start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Last 30 days
      break;
    case 'year':
      start = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(); // Last year
      break;
    case 'all':
      start = '1970-01-01T00:00:00Z'; // Start from epoch time
      break;
    default:
      throw new Error('Invalid range provided');
  }

  // Update the Elasticsearch query DSL for both range filtering and matching username
  const query = {
    query: {
      bool: {
        must: [
          { range: { 'Timestamp': { gte: start, lte: end } } }, // Range filter
          { match: { 'Name': username } } // Match username (use 'match' for approximate match)
        ]
      }
    }
  };

  const requestBody = JSON.stringify(query);
  if (debug) {
    console.log("requestBody:", requestBody);
  }

  // Construct the OpenSearch endpoint
  const endpoint = new URL(`https://${domain}/${indexName}/_search`);

  // Create the signed request
  const request = new HttpRequest({
    method: 'POST',
    hostname: endpoint.hostname,
    path: endpoint.pathname,
    headers: {
      host: endpoint.hostname,
      'Content-Type': 'application/json'
    },
    body: requestBody
  });

  try {
    // Sign the request using Signature V4
    const credentials = await defaultProvider()();
    const signer = new SignatureV4({
      credentials,
      service: 'es',
      region,
      sha256: Sha256
    });

    const signedRequest = await signer.sign(request);

    // Send the request and fetch the response
    const response = await makeHttpRequest(signedRequest);
    if (debug) {
      console.log('Query result:', response.body);
    }
    return response.body; // This will contain the hits and other query details

  } catch (error) {
    console.error('Error querying OpenSearch:', error);
  }
}

// Function to execute the signed HTTP request
const makeHttpRequest = (request) => {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: request.hostname,
      method: request.method,
      path: request.path,
      headers: request.headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: JSON.parse(data)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (request.body) {
      req.write(request.body);
    }

    req.end();
  });
};

// Function to parse and combine hits into a single string
async function combineHits(queryResult) {
  let fullContents = ""; // Initialize an empty string to store combined contents

  if (queryResult.hits && queryResult.hits.hits) {
    // Loop over the hits array
    queryResult.hits.hits.forEach(hit => {
      // Convert each hit object to a string and append it to the fullContents
      fullContents += JSON.stringify(hit) + "\n"; // Add a newline for separation
    });
  } else {
    // If no hits, return an appropriate message
    fullContents = "No hits found.";
  }

  return fullContents;
}

// handler('week');
// handler({"contextDuration": 'day'});

// Correctly pass the body as a string to the handler
// handler({
//   "body": JSON.stringify({
//     "contextDuration": "day",
//     "name": "Adrian"
//   })
// });