# EduGap - Localhost Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Application Features

The application is fully functional on localhost with:

- **No AWS/Cloud Dependencies**: All AWS Bedrock integration has been removed
- **Local Analysis**: Quiz analysis uses intelligent rule-based logic
- **Rich Content**: Comprehensive remediation content library built-in
- **Optional Database**: Works with or without MongoDB

## Application Flow

1. **Login** (`/login`) - Enter your name and email
2. **Profile** (`/profile`) - Select a subject (Math, Science, English, History)
3. **Quiz** (`/quiz`) - Answer 5 subject-specific questions
4. **Dashboard** (`/dashboard`) - View your risk analysis and performance
5. **Remediation** (`/remediation`) - Get personalized learning content

## Optional: MongoDB Setup

The app works perfectly without MongoDB using mock data. To enable MongoDB:

1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Add your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/edugap
```

Or use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edugap
```

3. Restart the dev server

If MongoDB connection fails, the app automatically falls back to mock data.

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Testing

Run the test suite:
```bash
npm test
```

The project includes 67 tests covering:
- Component rendering and interactions
- API route functionality
- Context providers
- Responsive design
- Animations
- Property-based testing with fast-check

## API Endpoints

All API endpoints work locally:

- `POST /api/analyze` - Analyze quiz results and calculate risk
- `POST /api/remediate` - Generate remediation content
- `POST /api/saveResult` - Save quiz results (MongoDB optional)
- `GET /api/health` - Health check endpoint

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB (optional)
- **Testing**: Jest, React Testing Library, fast-check
- **Charts**: Recharts

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Clear Next.js Cache

If you encounter build issues:
```bash
rm -rf .next
npm run dev
```

### MongoDB Connection Issues

The app will automatically fall back to mock data if MongoDB connection fails. Check your connection string in `.env.local`.

## Production Build

To create and test a production build:

```bash
npm run build
npm start
```

The production build is optimized and ready for deployment.

## Notes

- The app uses a professional gradient theme (blue to purple)
- All animations are powered by Framer Motion
- The chatbot component provides contextual help
- All analysis and remediation logic runs locally
- No external API calls or cloud dependencies

## Support

For issues or questions, check the main README.md file for more details about the project structure and features.
