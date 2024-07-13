import OpenAI from 'openai';

export async function generateSuggestions(sopContent) {
  try {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
      });

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": 'system', "content": 'You are an AI that provides suggestions for improving SOPs.' },
            { "role": 'user', "content": `Suggest improvements for the following SOP:\n${sopContent}` },
          ],
        max_tokens: 150,
      });

    return response.choices[0].message;
  } 
  catch (error) {
    if (error instanceof OpenAI.APIError) {
        console.error(error.status);  // e.g. 401
        console.error(error.message); // e.g. The authentication token you passed was invalid...
        console.error(error.code);  // e.g. 'invalid_api_key'
        console.error(error.type);  // e.g. 'invalid_request_error'
      } 
      else {
        // Non-API error
        console.log(error);
      }
  }
}

