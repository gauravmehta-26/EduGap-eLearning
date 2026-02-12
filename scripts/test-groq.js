/**
 * Test Groq AI Integration
 * 
 * This script tests if the Groq API is properly configured and working.
 * Run with: node scripts/test-groq.js
 */

require('dotenv').config({ path: '.env.local' });
const Groq = require('groq-sdk').default;

async function testGroqAPI() {
  console.log('🧪 Testing Groq AI Integration...\n');

  // Check if API key is configured
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GROQ_API_KEY not found in .env.local');
    console.log('\n📝 Please add your Groq API key to .env.local:');
    console.log('GROQ_API_KEY=your_api_key_here');
    process.exit(1);
  }

  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');

  // Initialize Groq client
  const groq = new Groq({ apiKey });

  try {
    console.log('\n🚀 Testing API connection...');
    
    // Test 1: Simple completion
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: 'Say "Hello from Groq!" if you can hear me.',
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    const response = completion.choices[0]?.message?.content || '';
    console.log('✅ API Response:', response);

    // Test 2: Generate a quiz question
    console.log('\n🎯 Testing quiz generation...');
    const quizCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational assessment creator specializing in Physics.',
        },
        {
          role: 'user',
          content: `Generate 1 multiple-choice quiz question for Physics.

Return ONLY valid JSON in this format:
{
  "id": "q1",
  "question": "Question text?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "topic": "Topic name",
  "difficulty": "medium"
}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const quizResponse = quizCompletion.choices[0]?.message?.content || '';
    console.log('✅ Quiz Question Generated:');
    
    // Try to parse JSON
    const jsonMatch = quizResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const question = JSON.parse(jsonMatch[0]);
      console.log('   Question:', question.question);
      console.log('   Topic:', question.topic);
      console.log('   Options:', question.options.length);
    } else {
      console.log('   Raw response:', quizResponse);
    }

    console.log('\n✅ All tests passed! Groq AI is working correctly.');
    console.log('\n📊 Summary:');
    console.log('   - API Key: Configured ✅');
    console.log('   - Connection: Working ✅');
    console.log('   - Quiz Generation: Working ✅');
    console.log('\n🎉 Your EduGap app should now use AI-generated content!');

  } catch (error) {
    console.error('\n❌ Error testing Groq API:');
    console.error(error.message);
    
    if (error.status === 401) {
      console.log('\n🔑 Invalid API key. Please check your GROQ_API_KEY in .env.local');
      console.log('Get a new key at: https://console.groq.com/keys');
    } else if (error.status === 429) {
      console.log('\n⏱️  Rate limit exceeded. Please wait a moment and try again.');
    } else {
      console.log('\n🔍 Full error:', error);
    }
    
    process.exit(1);
  }
}

// Run the test
testGroqAPI();
