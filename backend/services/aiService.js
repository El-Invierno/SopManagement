import OpenAI from 'openai';

// Initialize OpenAI instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// Function to generate suggestions for improving SOP content
export async function generateSuggestions(sopContent) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI that provides suggestions for improving SOPs.' },
                { "role": 'user', "content": `Suggest improvements for the following SOP:\n${sopContent}` },
            ],
            max_tokens: 150,
        });

        return response.choices[0].message.content;
    } catch (error) {
        handleOpenAIError(error);
    }
}

// Function to assess the quality of SOP content using OpenAI
export const assessQualityWithOpenAI = async(content) => {
    try {
        const prompt = `
          Analyze the following SOP content based on the following criteria:
          - Length of Content
          - Punctuation Usage
          - Language Understanding
          - Lucidity & Clarity
          - Crispness
          - Context Maintenance
          
          Provide a score out of 100 and a brief explanation for each criterion.
          
          SOP Content:
          "${content}"
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI that assesses the quality of SOPs out of 100. Give Total Score:' },
                { "role": 'user', "content": prompt },
            ],
            max_tokens: 150,
        });

        const analysis = response.choices[0].message.content.trim();
        console.log('OpenAI Quality Assessment:', analysis);

        // Extracting the total score from the response using regex
        const scoreMatch = analysis.match(/Total Score:\s*(\d+)/i);
        const qualityScore = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

        return { analysis, qualityScore };
    } catch (error) {
        handleOpenAIError(error);
        return { analysis: 'Error assessing quality', qualityScore: 0 };
    }
}

// Function to handle OpenAI errors consistently
function handleOpenAIError(error) {
    if (error instanceof OpenAI.APIError) {
        console.error('API Error:', error.status, error.message, error.code, error.type);
    } else {
        // Non-API error
        console.error('Unexpected Error:', error);
    }
}