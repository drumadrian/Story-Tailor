import https from 'https';
import { defaultProvider } from '@aws-sdk/credential-provider-node'; // For obtaining credentials automatically
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { Sha256 } from '@aws-crypto/sha256-browser';

const domain = 'search-storytailor2-y3v3y3gbfsfuyznpjhnvwx6vde.aos.us-west-2.on.aws'; // Your OpenSearch domain endpoint
const region = 'us-west-2'; // Your AWS region
const indexName = 'securedata'; // Index where data will be stored

export const handler = async (event) => {
  try {
    // Convert the event data to JSON (assuming the event is an object)
    // const eventData = JSON.stringify(event.body);
    const eventDataString = event.body;
    // const eventData = JSON.stringify(event);
    // const eventData = event;
    // console.log('Event:', event);
    console.log('Event data:', eventDataString);

    // Construct the OpenSearch endpoint for indexing data
    const endpoint = new URL(`https://${domain}/${indexName}/_doc`);

    // Create the HTTP request for POST (to add data to OpenSearch)
    const request = new HttpRequest({
      method: 'POST',
      hostname: endpoint.hostname,
      path: endpoint.pathname,
      headers: {
        host: endpoint.hostname,
        'Content-Type': 'application/json'
      },
      body: eventDataString,
    });

    // Sign the request using Signature Version 4
    const credentials = await defaultProvider()();
    const signer = new SignatureV4({
      credentials,
      service: 'es', // 'es' stands for Elasticsearch/OpenSearch service
      region,
      sha256: Sha256
    });

    const signedRequest = await signer.sign(request);

    // Execute the HTTP request
    const response = await makeHttpRequest(signedRequest);
    return {
      statusCode: response.statusCode,
      body: response.body
    };
  } catch (error) {
    console.error('Error indexing data into OpenSearch:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error indexing data into OpenSearch', error: error.message })
    };
  }
};

// Function to make the actual HTTP request and log response details
const makeHttpRequest = (request) => {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: request.hostname,
      method: request.method,
      path: request.path,
      headers: request.headers
    }, (res) => {
      let data = '';

      // Log the response status code
      console.log(`Response Status Code: ${res.statusCode}`);

      // Log the response headers
      console.log('Response Headers:', res.headers);

      res.on('data', chunk => { 
        data += chunk; 
      });

      res.on('end', () => {
        // Log the response body (full response data)
        console.log('Response Body:', data);

        // Resolve the full response data
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    // Write the request body (the event data)
    if (request.body) {
      req.write(request.body);
    }

    req.end();
  });
};

// Example invocation (replace with actual event data)
// handler({ key: "value", message: "This is a test document", "Timestamp": new Date().toISOString()});

// handler({"Timestamp":"2024-09-23T07:52:20.745Z","Name":"Adrian","Age":"41","Emotion":"Tired","JournalEntry":"My software works and I need sleep"});
