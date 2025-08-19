# Risk-Mirror

## Project File Structure

```
RISK-MIRROR/
├── 📂 web_app/                   # Main Next.js application (Frontend + Core Backend)
│   ├── 📂 app/
│   │   ├── 📂 (auth)/             # Route group for authentication pages
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── 📂 (dashboard)/        # Route group for protected user pages
│   │   │   ├── dashboard/page.tsx # Main dashboard with Risk DNA
│   │   │   ├── profile/page.tsx   # User profile, avatars, settings
│   │   │   ├── wellness/page.tsx  # Emotional tracking, box breathing
│   │   │   ├── planning/page.tsx  # 3-month plan, goal setting
│   │   │   ├── leaderboard/page.tsx # Gamification leaderboard
│   │   │   └── layout.tsx         # Shared layout for the dashboard
│   │   ├── 📂 api/                # Next.js Backend API Routes
│   │   │   ├── auth/[...nextauth]/route.ts # NextAuth.js for authentication
│   │   │   ├── user/route.ts      # CRUD for user profile
│   │   │   ├── transactions/route.ts # API for Axio/Plaid data
│   │   │   ├── calendar/route.ts  # API for Google Calendar sync
│   │   │   └── risk-score/route.ts # Endpoint to fetch the latest risk score
│   │   ├── layout.tsx
│   │   └── page.tsx               # Landing page
│   ├── 📂 components/             # Reusable React components
│   │   ├── ui/                    # Basic UI elements (Button, Card, etc.)
│   │   ├── dashboard/             # Components specific to the dashboard
│   │   │   ├── RiskDnaVisual.tsx
│   │   │   └── CalmIndexMeter.tsx
│   │   └── wellness/
│   │       ├── BoxBreathing.tsx
│   │       └── EmotionCapture.tsx   # Component for face/voice/typing test
│   ├── 📂 lib/                    # Helper functions, libraries, SDKs
│   │   ├── db.ts                  # MongoDB connection setup
│   │   ├── auth.ts                # Authentication configuration (NextAuth)
│   │   ├── aiClient.ts            # Client to communicate with the ai_agents service
│   │   └── encryption.ts          # Encryption/decryption utilities
│   ├── 📂 public/                 # Static assets (images, fonts, etc.)
│   ├── next.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile                 # To containerize the Next.js app
│
├── 📂 ai_agents/                  # Dedicated folder for all Python AI/ML services
│   ├── 📂 central_agent_service/  # LangGraph orchestrator service
│   │   ├── 📂 app/
│   │   │   ├── agents/            # Logic for each specialist agent
│   │   │   │   ├── financial_agent.py
│   │   │   │   ├── health_agent.py
│   │   │   │   └── lifestyle_agent.py
│   │   │   ├── tools/             # Tools the agents can use (API callers, DB readers)
│   │   │   ├── graph.py           # Core LangGraph state machine definition
│   │   │   └── main.py            # FastAPI server entrypoint
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── 📂 ml_models_service/      # Service to host specific ML models
│       ├── 📂 app/
│       │   ├── models/            # Stored model files (.h5, .onnx, etc.)
│       │   ├── processors/        # Data preprocessing logic
│       │   └── main.py            # FastAPI endpoints (/predict/emotion, /predict/voice)
│       ├── Dockerfile
│       └── requirements.txt
│
├── 📂 data_pipelines/             # Background data processing workers
│   ├── 📂 kafka_consumers/
│   │   ├── transaction_consumer.py  # Processes spending data, detects fraud
│   │   ├── market_data_consumer.py  # Monitors market for crashes, triggers alerts via Kafka
│   │   ├── risk_calculator.py       # Re-calculates Dynamic Risk DNA based on new data
│   │   └── alert_generator.py       # Listens for alert events and sends push notifications
│   ├── Dockerfile
│   └── requirements.txt
│
├── .env.example
├── .gitignore
├── docker-compose.yml           # Orchestrates all services (web_app, ai_agents, etc.)
└── README.md
```

## Front-end File Structure

The front-end file structure is organized as follows:

```
/frontend/
├── app/
│   ├── (auth)/                # Group for auth-related pages
│   │   ├── login/
│   │   │   └── page.tsx       # The Login page component
│   │   └── signup/
│   │       └── page.tsx       # The Sign Up page component
│   │
│   ├── (main)/                # Group for main, protected app pages
│   │   ├── dashboard/
│   │   │   └── page.tsx       # The main Dashboard page
│   │   ├── profile/
│   │   │   └── page.tsx       # The User Profile page
│   │   ├── simulation/
│   │   │   └── page.tsx       # The Risk Simulation Game page
│   │   └── survey/
│   │       └── page.tsx       # The Onboarding Survey page
│   │
│   ├── components/            # You should CREATE THIS FOLDER here
│   │   ├── ui/                # For generic UI elements (buttons, modals)
│   │   ├── auth/              # Auth-specific components
│   │   └── dashboard/         # Components used only on the dashboard
│   │
│   ├── layout.tsx             # The ROOT layout for your entire app
│   └── page.tsx               # The component for your landing page (www.yourapp.com/)
│
└── ... (other Next.js files)
```

- **backend/**: All backend microservices and data processing logic
- **frontend/**: Next.js web application (React, TypeScript)
- **docker-compose.yml**: For running all services locally during development
- **README.md**: Project overview, setup instructions
- **.gitignore**: Ignore node_modules, .pyc, etc.
- **LICENSE**: Project license

> Each backend service and the data processor is containerized with its own Dockerfile and requirements.txt for dependencies.
> The frontend uses Next.js 13+ App Router structure.
> │
> └── ... (other Next.js files)
