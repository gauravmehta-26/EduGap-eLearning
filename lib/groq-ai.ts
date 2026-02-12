/**
 * Groq AI Integration
 * 
 * Ultra-fast AI inference using Groq's LPU (Language Processing Unit)
 * Models: Llama 3, Mixtral, Gemma
 */

import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

let groqClient: Groq | null = null;

/**
 * Initialize Groq client
 */
function getGroqClient(): Groq {
  if (!groqClient && GROQ_API_KEY) {
    groqClient = new Groq({
      apiKey: GROQ_API_KEY,
    });
  }
  
  if (!groqClient) {
    throw new Error('Groq API key not configured');
  }
  
  return groqClient;
}

/**
 * Call Groq AI with a prompt
 */
export async function callGroq(
  prompt: string,
  systemPrompt?: string,
  options?: {
    maxTokens?: number;
    temperature?: number;
    model?: string;
  }
): Promise<string> {
  try {
    const client = getGroqClient();
    
    const messages: any[] = [];
    
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }
    
    messages.push({
      role: 'user',
      content: prompt,
    });

    const completion = await client.chat.completions.create({
      model: options?.model || 'llama-3.3-70b-versatile', // Updated model
      messages,
      max_tokens: options?.maxTokens || 2000,
      temperature: options?.temperature || 0.7,
      top_p: 0.9,
    });

    const response = completion.choices[0]?.message?.content || '';
    return response.trim();
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

/**
 * Generate quiz questions using Groq AI
 */
export async function generateQuizQuestions(
  subject: string,
  numQuestions: number = 5
): Promise<any[]> {
  const systemPrompt = `You are an expert educational assessment creator specializing in ${subject}. Create diagnostic quiz questions that test fundamental understanding and identify learning gaps.`;

  const prompt = `Generate ${numQuestions} multiple-choice diagnostic quiz questions for ${subject}.

Requirements:
- Cover different topics within ${subject}
- Include 4 options for each question
- Mark the correct answer (0-3 index)
- Questions should test conceptual understanding
- Difficulty: High school to early college level

Return ONLY valid JSON array in this exact format:
[
  {
    "id": "q1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "topic": "Specific topic name",
    "difficulty": "medium"
  }
]

Important: Return ONLY the JSON array, no other text.`;

  try {
    const response = await callGroq(prompt, systemPrompt, { 
      maxTokens: 3000,
      temperature: 0.8, // Higher for variety
    });
    
    // Extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('Invalid JSON response from Groq:', response);
      throw new Error('Invalid JSON response from Groq');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    
    // Validate questions
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('No questions generated');
    }
    
    return questions;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw error;
  }
}

/**
 * Analyze quiz results using Groq AI
 */
export async function analyzeQuizResults(
  subject: string,
  correctAnswers: number,
  totalQuestions: number,
  weakTopics: string[]
): Promise<{
  failureRisk: number;
  summary: string;
  recommendations: string[];
}> {
  const systemPrompt = `You are an expert educational analyst. Analyze student performance and provide accurate failure risk assessment and actionable recommendations.`;

  const percentage = (correctAnswers / totalQuestions) * 100;

  const prompt = `Analyze this student's ${subject} quiz performance:

- Correct Answers: ${correctAnswers}/${totalQuestions} (${percentage.toFixed(1)}%)
- Weak Topics: ${weakTopics.join(', ') || 'None identified'}

Provide analysis in JSON format:
{
  "failureRisk": <number 0-100>,
  "summary": "<2-3 sentence analysis>",
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
}

Failure risk guidelines:
- 90-100%: 5-15% risk
- 80-89%: 20-30% risk
- 70-79%: 35-50% risk
- 60-69%: 55-70% risk
- 50-59%: 75-85% risk
- Below 50%: 90-95% risk

Return ONLY the JSON object, no other text.`;

  try {
    const response = await callGroq(prompt, systemPrompt, {
      temperature: 0.5, // Lower for consistency
    });
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Invalid JSON response from Groq:', response);
      throw new Error('Invalid JSON response from Groq');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    // Validate response
    if (typeof analysis.failureRisk !== 'number' || !analysis.summary) {
      throw new Error('Invalid analysis format');
    }
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing quiz results:', error);
    throw error;
  }
}

/**
 * Generate remediation content using Groq AI
 */
export async function generateRemediationContent(
  subject: string,
  topic: string
): Promise<{
  explanation: string;
  keyPoints: string[];
  examples: string[];
  studyResources: Array<{
    title: string;
    type: string;
    description: string;
  }>;
  youtubeSearchQuery: string;
}> {
  const systemPrompt = `You are an expert ${subject} educator. Create comprehensive, clear remediation content that helps students master difficult concepts.`;

  const prompt = `Create detailed remediation content for the topic: "${topic}" in ${subject}.

Provide content in JSON format:
{
  "explanation": "<Clear 3-4 sentence explanation of the concept>",
  "keyPoints": ["<key point 1>", "<key point 2>", "<key point 3>", "<key point 4>"],
  "examples": ["<worked example 1 with solution>", "<worked example 2 with solution>"],
  "studyResources": [
    {
      "title": "<Resource title>",
      "type": "article",
      "description": "<Brief description>"
    },
    {
      "title": "<Resource title>",
      "type": "video",
      "description": "<Brief description>"
    },
    {
      "title": "<Resource title>",
      "type": "practice",
      "description": "<Brief description>"
    }
  ],
  "youtubeSearchQuery": "<Optimized search query for YouTube>"
}

Make content:
- Clear and accessible
- Include practical examples with step-by-step solutions
- Provide actionable study resources
- Focus on conceptual understanding

Return ONLY the JSON object, no other text.`;

  try {
    const response = await callGroq(prompt, systemPrompt, { 
      maxTokens: 2500,
      temperature: 0.7,
    });
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Invalid JSON response from Groq:', response);
      throw new Error('Invalid JSON response from Groq');
    }
    
    const content = JSON.parse(jsonMatch[0]);
    
    // Validate response
    if (!content.explanation || !content.keyPoints || !content.examples) {
      throw new Error('Invalid remediation content format');
    }
    
    return content;
  } catch (error) {
    console.error('Error generating remediation content:', error);
    throw error;
  }
}

/**
 * Check if Groq is configured
 */
export function isGroqConfigured(): boolean {
  const isConfigured = !!GROQ_API_KEY;
  if (!isConfigured) {
    console.log('[GROQ AI] API key not found in environment variables');
  } else {
    console.log('[GROQ AI] API key configured successfully');
  }
  return isConfigured;
}

/**
 * Get available Groq models
 */
export function getAvailableModels() {
  return [
    {
      id: 'llama-3.3-70b-versatile',
      name: 'Llama 3.3 70B',
      description: 'Most capable, best for complex tasks',
      speed: 'Fast',
    },
    {
      id: 'llama-3.1-8b-instant',
      name: 'Llama 3.1 8B',
      description: 'Fastest, good for simple tasks',
      speed: 'Very Fast',
    },
    {
      id: 'mixtral-8x7b-32768',
      name: 'Mixtral 8x7B',
      description: 'Good balance of speed and quality',
      speed: 'Fast',
    },
  ];
}
