# IBM Granite AI Integration Setup

Complete guide to integrate IBM Granite AI into your EduGap application for automated quiz generation, analysis, and remediation.

## 🎯 What is IBM Granite?

IBM Granite is IBM's family of open-source AI models designed for enterprise and educational use. It provides:
- ✅ **Powerful AI capabilities** comparable to GPT-3.5
- ✅ **Free tier available** through IBM watsonx.ai
- ✅ **Enterprise-grade** reliability and security
- ✅ **Educational focus** - perfect for learning applications

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Create IBM Cloud Account

1. Go to: https://cloud.ibm.com/registration
2. Sign up for a free IBM Cloud account
3. Verify your email address
4. Complete account setup

### Step 2: Access watsonx.ai

1. Log in to IBM Cloud: https://cloud.ibm.com
2. Search for "watsonx.ai" in the catalog
3. Click **"watsonx.ai"**
4. Click **"Launch watsonx.ai"**

### Step 3: Create a Project

1. In watsonx.ai, click **"Projects"**
2. Click **"New project"**
3. Choose **"Create an empty project"**
4. Name it: `EduGap-AI`
5. Click **"Create"**
6. **Copy the Project ID** (you'll need this)

### Step 4: Get API Key

1. Go to: https://cloud.ibm.com/iam/apikeys
2. Click **"Create"**
3. Name it: `edugap-granite-key`
4. Click **"Create"**
5. **Copy the API key** (save it securely - you can't see it again!)

### Step 5: Get API URL

Your API URL depends on your region:
- **Dallas**: `https://us-south.ml.cloud.ibm.com/ml/v1/text/generation`
- **Frankfurt**: `https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation`
- **Tokyo**: `https://jp-tok.ml.cloud.ibm.com/ml/v1/text/generation`

Most users: Use Dallas (us-south)

### Step 6: Configure Your Application

Edit `.env.local` in your project root:

```bash
# IBM Granite AI Configuration
GRANITE_API_KEY=your_api_key_here
GRANITE_PROJECT_ID=your_project_id_here
GRANITE_API_URL=https://us-south.ml.cloud.ibm.com/ml/v1/text/generation

# MongoDB (Optional)
MONGODB_URI=mongodb://localhost:27017/edugap
```

### Step 7: Test Connection

```bash
npm run dev
```

Visit http://localhost:3000 and complete a quiz. You should see AI-powered analysis!

---

## 🎓 Features Enabled with IBM Granite

### 1. AI-Generated Quiz Questions
- **Automatic generation** of diagnostic questions
- **Subject-specific** content (Physics, Chemistry, Math, Biology)
- **Multiple difficulty levels**
- **Conceptual understanding** focus

### 2. Intelligent Analysis
- **Accurate failure risk** calculation
- **Personalized insights** based on performance
- **Weak concept identification**
- **Actionable recommendations**

### 3. Comprehensive Remediation
- **Detailed explanations** of concepts
- **Key points** summary
- **Worked examples** with solutions
- **Study resources** recommendations
- **YouTube video** suggestions

### 4. Automated Content Generation
- **No manual content creation** needed
- **Always up-to-date** information
- **Adaptive to student needs**
- **Scalable** across all subjects

---

## 📊 API Usage and Limits

### Free Tier (Lite Plan)
- **Cost**: FREE
- **Requests**: 20,000 tokens/month
- **Models**: Access to Granite models
- **Perfect for**: Development and small projects

### Standard Plan
- **Cost**: Pay-as-you-go
- **Requests**: Unlimited
- **Models**: All models available
- **Perfect for**: Production use

### Token Usage Estimate
- Quiz generation (5 questions): ~500 tokens
- Analysis: ~200 tokens
- Remediation: ~400 tokens
- **Total per student**: ~1,100 tokens
- **Free tier supports**: ~18 students/month

---

## 🔧 Configuration Options

### Environment Variables

```bash
# Required
GRANITE_API_KEY=<your-api-key>
GRANITE_PROJECT_ID=<your-project-id>

# Optional (defaults shown)
GRANITE_API_URL=https://us-south.ml.cloud.ibm.com/ml/v1/text/generation
GRANITE_MODEL=ibm/granite-13b-chat-v2
GRANITE_MAX_TOKENS=2000
GRANITE_TEMPERATURE=0.7
```

### Available Models

- `ibm/granite-13b-chat-v2` (Recommended - balanced)
- `ibm/granite-13b-instruct-v2` (Instruction-following)
- `ibm/granite-20b-multilingual` (Multilingual support)

---

## 🧪 Testing Your Integration

### Method 1: Health Check
Visit: http://localhost:3000/api/health

Should show:
```json
{
  "ai": {
    "provider": "IBM Granite",
    "status": "connected"
  }
}
```

### Method 2: Generate Quiz
1. Go to http://localhost:3000/profile
2. Select a subject
3. Click "Start Quiz"
4. Questions should be AI-generated

### Method 3: Complete Quiz
1. Answer all questions
2. View dashboard
3. Check for AI-powered analysis
4. Click "Fix Me" on weak concepts
5. See AI-generated remediation

---

## 🎯 How It Works

### Quiz Generation Flow
```
User selects subject
    ↓
Frontend calls /api/generate-quiz
    ↓
Backend calls IBM Granite
    ↓
Granite generates 5 questions
    ↓
Questions returned to frontend
    ↓
User takes quiz
```

### Analysis Flow
```
User completes quiz
    ↓
Frontend calls /api/analyze
    ↓
Backend calls IBM Granite
    ↓
Granite analyzes performance
    ↓
Calculates failure risk
    ↓
Identifies weak concepts
    ↓
Results shown on dashboard
```

### Remediation Flow
```
User clicks "Fix Me"
    ↓
Frontend calls /api/remediate
    ↓
Backend calls IBM Granite
    ↓
Granite generates content
    ↓
Fetches YouTube videos
    ↓
Comprehensive remediation shown
```

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Rotate API keys** regularly
3. **Use environment-specific** keys (dev/prod)
4. **Monitor usage** in IBM Cloud dashboard
5. **Set up alerts** for unusual activity

---

## 🆘 Troubleshooting

### Error: "API key not configured"
→ Check `.env.local` has `GRANITE_API_KEY` set
→ Restart dev server after adding keys

### Error: "Project ID not found"
→ Verify `GRANITE_PROJECT_ID` is correct
→ Check project exists in watsonx.ai

### Error: "Authentication failed"
→ Regenerate API key in IBM Cloud
→ Update `.env.local` with new key

### Error: "Rate limit exceeded"
→ You've used your free tier tokens
→ Wait for monthly reset or upgrade plan

### Error: "Invalid JSON response"
→ Granite sometimes returns malformed JSON
→ App has fallback to rule-based logic
→ Check console logs for details

---

## 📈 Monitoring Usage

### IBM Cloud Dashboard
1. Go to: https://cloud.ibm.com/resources
2. Find your watsonx.ai instance
3. Click **"Usage"**
4. View token consumption

### Application Logs
```bash
# Start dev server with logs
npm run dev

# Watch for Granite API calls
# Look for: "Calling IBM Granite API..."
```

---

## 🎉 What's Next?

After setup, your application will:
1. ✅ Generate AI-powered quiz questions
2. ✅ Provide accurate failure risk analysis
3. ✅ Identify weak concepts automatically
4. ✅ Create personalized remediation content
5. ✅ Recommend YouTube videos
6. ✅ Adapt to student performance

---

## 📚 Additional Resources

- **IBM watsonx.ai Docs**: https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html
- **Granite Models**: https://www.ibm.com/granite
- **API Reference**: https://cloud.ibm.com/apidocs/watsonx-ai
- **Community**: https://community.ibm.com/community/user/watsonx/home

---

## 💡 Tips for Best Results

1. **Be specific** in prompts for better responses
2. **Monitor token usage** to stay within limits
3. **Cache responses** for repeated queries
4. **Use fallbacks** for reliability
5. **Test thoroughly** before production

---

**Your EduGap application is now powered by IBM Granite AI! 🚀**

Start generating quizzes, analyzing performance, and creating personalized remediation content automatically.
