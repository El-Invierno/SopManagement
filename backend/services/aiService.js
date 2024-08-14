import OpenAI from 'openai';

// Initialize OpenAI instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// Function to generate suggestions for improving SOP content
// Function to generate suggestions for improving SOP content
export async function generateSuggestions(sopContent) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI assistant that provides clear and direct answers based on the input provided. Give the output a nice formating(mandatory)' },
                { "role": 'user', "content": `Given the following SOP content, generate the most appropriate Standard Operating Procedure that could form out of the given input. Don't mention the title:\n${sopContent}` },
            ],
            max_tokens: 500,
        });

        // Return JSON object with key 'suggestions'
        return { suggestions: response.choices[0].message.content.trim() };
    } catch (error) {
        console.error('Error generating suggestions:', error);
        throw error;
    }
}

// Function to assess the quality of SOP content using OpenAI
export const assessQualityWithOpenAI = async(content) => {
    try {
        const prompt = `
          Analyze the following SOP content based on Banking and Investment parameters on each of the following criteria:
          - Length of Content [Real SOP content is ranging from 500 words onwards].
          - Punctuation Usage
          - Language Understanding
          - Lucidity & Clarity
          - Context Maintenance
          
          Provide a score out of 100 and a brief explanation for each criterion (Mandatory explanation for all criteria). Judge very strictly.
          Give the complete breakdown of the score. Try to give marks corresponding to a normal distribution.
          
          SOP Content:
          "${content}"
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI that assesses the quality of SOPs out of 100. Give Total Score:' },
                { "role": 'user', "content": prompt },
            ],
            max_tokens: 500,
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


export async function generateChecklistItems(sopContent) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI assistant that creates concise checklist items based on the input SOP content.' },
                { "role": 'user', "content": `Based on the following SOP content, create a list of concise checklist items:\n${sopContent}` },
            ],
            max_tokens: 500,
        });

        const checklist = response.choices[0].message.content.trim().split('\n').map(item => item.trim());
        return { checklist };
    } catch (error) {
        console.error('Error generating checklist:', error);
        throw error;
    }
}
