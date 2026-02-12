# EduGap - Educational Gap Analysis Platform

A full-stack Next.js application that helps identify and remediate learning gaps through AI-powered analysis. Students take subject-specific quizzes, receive risk assessments, and get personalized remediation content.

## Features

- **Login & Profile**: User authentication and subject selection (Math, Science, English, History)
- **Quiz System**: 5-question assessments with multiple-choice answers
- **Dashboard**: Risk analysis with performance charts and weak concept identification
- **Remediation**: Personalized learning content for identified gaps
- **AI Chatbot**: Interactive assistant on Profile and Dashboard pages
- **Responsive Design**: Professional gradient theme (blue-purple) with smooth animations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB (optional - graceful fallback to mock data)
- **Testing**: Jest, React Testing Library (61 tests)
- **Charts**: Recharts for data visualization

## Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment file (optional for MongoDB):

```bash
cp .env.example .env.local
```

Edit `.env.local` if you want to use MongoDB:
```
MONGODB_URI=your_mongodb_connection_string
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Application Flow

1. **Login** (`/login`) - Enter name and email
2. **Profile** (`/profile`) - Select subject (Math, Science, English, History)
3. **Quiz** (`/quiz`) - Answer 5 subject-specific questions
4. **Dashboard** (`/dashboard`) - View risk analysis and performance metrics
5. **Remediation** (`/remediation`) - Access personalized learning content

## API Endpoints

- `POST /api/analyze` - Analyze quiz results and calculate risk
- `POST /api/remediate` - Generate remediation content
- `POST /api/saveResult` - Save quiz results (MongoDB optional)
- `GET /api/health` - Health check endpoint

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── profile/           # Profile & subject selection
│   ├── quiz/              # Quiz interface
│   ├── dashboard/         # Risk analysis dashboard
│   └── remediation/       # Learning content
├── components/            # React components
│   ├── ui/               # UI components (Button, Card, Input, Header, Chatbot)
│   ├── dashboard/        # Dashboard-specific components
│   └── remediation/      # Remediation components
├── lib/                   # Utilities and contexts
│   ├── types.ts          # TypeScript types
│   ├── mockData.ts       # Mock data for testing
│   ├── api.ts            # API client functions
│   ├── db.ts             # MongoDB connection
│   ├── SubjectContext.tsx # Subject state management
│   └── QuizContext.tsx   # Quiz state management
└── models/               # MongoDB models

```

## Testing

Run the test suite:

```bash
npm test
```

The project includes 61 tests covering:
- Component rendering and interactions
- API route functionality
- Context providers
- Responsive design
- Animations
- Mock data utilities

## Database (Optional)

The application works without MongoDB by using mock data. To enable MongoDB:

1. Set `MONGODB_URI` in `.env.local`
2. The app will automatically connect and save results
3. If connection fails, it gracefully falls back to mock data

## Notes

- The app uses a gradient theme (blue to purple) consistently across all pages
- All animations are powered by Framer Motion for smooth transitions
- The chatbot component provides contextual help on Profile and Dashboard pages
- Production build tested and working: `npm run build` ✅

## License

Private project for educational purposes.
