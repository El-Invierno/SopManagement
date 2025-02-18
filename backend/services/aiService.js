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
                { "role": 'system', "content": 'You are an AI assistant that provides clear and direct answers based on the input provided. Format the output in Markdown (mandatory).' },
                { "role": 'user', "content": `Given the following SOP content, generate the most appropriate Standard Operating Procedure that could form out of the given input. Don't mention the title:\n${sopContent}` },
            ],
            max_tokens: 700,
        });

        // Return JSON object with key 'suggestions'
        return { suggestions: response.choices[0].message.content.trim() };
    } catch (error) {
        console.error('Error generating suggestions:', error);
        throw error;
    }
}


export async function generateResourceLinks(sopContent) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI assistant that provides helpful and relevant online resources or links related to the given SOP content. Format the output in Markdown (mandatory).' },
                { "role": 'user', "content": `Based on the following SOP content, provide a list of relevant online resources or links where additional data and best practices related to the SOP can be found:\n${sopContent}` },
            ],
            max_tokens: 500,
        });

        // Parse the response to extract links and descriptions
        const resources = response.choices[0].message.content.trim().split('\n').map(item => item.trim());

        // Convert to a JSON object with key 'resources'
        return { resources };
    } catch (error) {
        console.error('Error generating resource links:', error);
        throw error;
    }
}

// Function to assess the quality of SOP content using OpenAI
export const assessQualityWithOpenAI = async(content) => {
    try {
        const prompt = `
          Analyze the following SOP content based on Banking and Investment parameters on each of the following criteria:
          - **Length of Content** [Real SOP content is ranging from 500 words onwards].
          - **Punctuation Usage**
          - **Language Understanding**
          - **Lucidity & Clarity**
          - **Context Maintenance**
          - **Functional Correctness** [Check if the SOP correctly addresses all necessary procedures and steps]
          - **Completeness** [Identify if there are any crucial steps or information missing in the SOP]
          
          Provide a score out of 100 and a brief explanation for each criterion (Mandatory explanation for all criteria). Judge very strictly.
          Give the complete breakdown of the score. Try to give marks corresponding to a normal distribution.
          
          SOP Content:
          "${content}"
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": 'system', "content": 'You are an AI that assesses the quality of SOPs out of 100. Provide the score breakdown in Markdown format (mandatory).' },
                { "role": 'user', "content": prompt },
            ],
            max_tokens: 700,
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
                { "role": 'system', "content": 'You are an AI assistant that creates concise checklist items based on the input SOP content. Format the output in Markdown (mandatory).' },
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