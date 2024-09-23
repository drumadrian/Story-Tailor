import axios from 'axios'; // Ensure axios is installed

export const handler = async (event) => {
  console.log("event:", event);

  // Extract the context duration from the event
  const contextDuration = event;
  const context = "I am going through a period of uncertainty and I am feeling anxious.";
  const bookName = "The Bible";
  console.log("contextDuration:", contextDuration);
  console.log("context:", context);
  console.log("bookName:", bookName);

  // Construct the prompt for the API
  const promptPart1 = "Give me a sentiment analysis of all my information and my emotions using the context I have provided. The context is what I'm going through right now. ";
  const promptPart2 = "Give me a story based on the wisdom of the book named " + bookName + " that will help me feel better. ";
  const promptPart3 = "The time duration of this context is: " + contextDuration + ". ";
  const promptPart4 = "What I'm going through is: " + context;

  const storyprompt = promptPart1 + promptPart2 + promptPart3 + promptPart4;

  console.log("storyprompt:", storyprompt);

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
    console.log("completion:", completion);
    return completion;

  } catch (error) {
    console.error("Error invoking OpenAI API:", error.response ? error.response.data : error.message);
    return "Sorry, there was an error generating the response.";
  }
}