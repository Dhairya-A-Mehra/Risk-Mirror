# Risk Mirror: Your AI-Powered Life Co-Pilot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Risk Mirror** is a next-generation fintech platform designed for the MUFG Hackathon. It moves beyond traditional financial tracking to provide a holistic, real-time analysis of a user's financial, mental, and physical well-being. By generating a "Dynamic Risk DNA," our platform acts as a personalized life co-pilot, offering proactive, empathetic, and gamified guidance to help users achieve true stability and wellness.

---

## ✨ Key Features

Our platform is built on a foundation of hyper-personalization and proactive intervention, offering a suite of intelligent features:

#### **Core Intelligence**

- **Dynamic Risk DNA:** A personalized, evolving risk profile that updates in real-time based on financial data, behavioral signals, and external market events, replacing outdated static credit scores.
- **Cross-Risk Interdependency Mapping:** Our AI maps the causal chains between different risk domains. For example, it understands how a sudden market crash (financial risk) can increase user stress (health risk), which in turn could lead to impulsive decisions (behavioral risk).
- **Multi-Signal Emotion Detection:** Using a combination of facial analysis, voice tone, and typing patterns, the app can sense the user's emotional state to offer timely support.
- **Explainability (SHAP + LIME):** We provide transparent, easy-to-understand explanations for all AI-driven recommendations, building user trust.

#### **User-Facing Features**

- **Unified Dashboard ("Life CFO Mode"):** A single, beautiful interface to view and manage your finances, health, and lifestyle side-by-side.
- **Personalized Action Plans:** AI-generated 3-month roadmaps for finance and health, tailored to the user's current habits and goals.
- **Adaptive "Panic Mode" Interventions:** When high stress is detected, the app can trigger calming interventions like a Box Breathing exercise, UI dimming, or soothing music recommendations.
- **Gamified Leaderboard & Badges:** A combined leaderboard tracking financial progress (credit score) and positive habits (streaks) to drive engagement and healthy competition.
- **Real-Time External Sentiment Analysis:** The system scrapes news and social media (like Twitter/X) to alert users about external risks affecting their investments or financial stability _before_ they are reflected in market data.
- **Intelligent Integrations:** Seamlessly syncs with bank accounts (via Axio), Google Calendar, and health trackers to provide a complete picture of the user's life.

---

## 🚀 How End-Users Benefit

Risk Mirror isn't just another budgeting app; it's a partner in well-being.

- **From Reactive to Proactive:** Instead of just showing you past spending, we help you anticipate future risks and opportunities.
- **Holistic Wellness:** We recognize that financial health is deeply connected to mental health. Our platform helps you manage both.
- **Builds Confidence:** By explaining its reasoning and providing clear, actionable steps, Risk Mirror empowers users to make smarter, more confident decisions.
- **Engaging & Motivating:** Gamification and personalized challenges turn the often-stressful task of managing finances into a rewarding journey.

---

## 🖼️ Screenshot

## **A.** Landing Page
![WhatsApp Image 2025-08-22 at 10 55 05_6faf15b5](https://github.com/user-attachments/assets/a784f6c6-94eb-416c-ad2d-28cf67545796)

## Survey Page
![WhatsApp Image 2025-08-22 at 10 56 35_9dc70074](https://github.com/user-attachments/assets/3dd80224-a7b4-4d90-ad0f-c279fc737dcc)

## Dashboard Page
![WhatsApp Image 2025-08-22 at 10 54 05_bae8f5fb](https://github.com/user-attachments/assets/dc91f585-25d9-40c8-b9b7-efd608ccd777)

## Profile Page
![WhatsApp Image 2025-08-22 at 10 58 56_8466c0d7](https://github.com/user-attachments/assets/a546a2a1-cac7-42c7-95a9-f49537d1c415)

---

## 🛠️ Tech Stack

Our platform is built on a modern, scalable, and powerful technology stack designed for real-time data processing and intelligent decision-making.

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend (Web App):** Next.js API Routes, Vercel
- **Backend (AI Agents):** Python, FastAPI, LangChain, LangGraph
- **Databases:**
  - **Primary:** MongoDB Atlas (for core user data)
  - **Caching & Vector Store:** Redis (hosted on Upstash)
- **Real-Time Data Processing:** Apache Kafka (planned for production scale)
- **LLMs & AI Services:** Groq (for agentic reasoning), Google Gemini (for image analysis), AssemblyAI (for voice analysis)
- **Deployment:** Vercel (Frontend), Render (AI Service)

---

## 📂 Project Structure

The project is organized as a monorepo with two primary services: `web_app` for the user-facing application and `ai_agents` for the intelligent backend.

## Project File Structure

```
RISK-MIRROR/
├── 📂 web_app/                   # Main Next.js application (Frontend + Core Backend)
│   ├── 📂 app/
│   │   ├── 📂 (auth)/             # Route group for authentication pages
│   │   ├── 📂 (dashboard)/        # Route group for protected user pages
│   │   ├── 📂 api/                # Next.js Backend API Routes
│   ├── 📂 components/             # Reusable React components
│   │   ├── ui/                    # Basic UI elements (Button, Card, etc.)
│   │   ├── dashboard/             # Components specific to the dashboard
│   ├── 📂 lib/                    # Helper functions, libraries, SDKs
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
│   ├── Dockerfile
│   └── requirements.txt
│
├── .env.example
├── .gitignore
├── docker-compose.yml           # Orchestrates all services (web_app, ai_agents, etc.)
└── README.md
```

---

## ⚙️ How to Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- Python (v3.9 or later)
- MongoDB account (local or Atlas)
- Redis instance (local or Upstash)
- API keys for Groq, Google Gemini, and AssemblyAI

### 1. Clone the Repository

```bash
git clone https://github.com/Dhairya-A-Mehra/Risk-Mirror.git
cd risk-mirror
```

### 2. Set Up Environment Variables

- Create a .env file in the root of the project by copying .env.example (if you have one) or creating it from scratch.
- Fill in all the required API keys and database URIs. This single file will be used by both services.

```bash
# For Next.js App
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=...

# For AI Agents
GROQ_API_KEY=...
OPENAI_API_KEY=... # For embeddings
GOOGLE_API_KEY=...
ASSEMBLYAI_API_KEY=...

# Databases
MONGODB_URI=...
MONGODB_DB_NAME=risk_mirror
REDIS_URL=...
```

### 3. Run the AI Agent Service (FastAPI)

- Open a terminal window.
- Navigate to the ai_agents directory:

```bash
cd ai_agents
```

- Create and activate a Python virtual environment:

```bash
python -m venv venv
# On Windows: .\venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
```

- Install dependencies:

```bash
pip install -r requirements.txt
```

- Run the server (it will start on http://localhost:8000):

```bash
uvicorn app.main:app --reload
```

### 4. Run the Web App (Next.js)

- Open a NEW terminal window.
- Navigate to the web_app directory:

```bash
cd web_app
```

- Install Dependencies:

```bash
npm install
```

- Run the development server (it will start on http://localhost:3000):

```bash
npm run dev
```

### 5. Access the Application

- Open your browser and navigate to http://localhost:3000.
- You can now sign up, sign in, and explore the Risk Mirror platform!

---

## 🤝 Contributors

This project was proudly developed for the MUFG Hackathon by:

- **[Dhairya A Mehra](https://github.com/Dhairya-A-Mehra)**
- **[Ruhani Rai Dhamija](https://github.com/Ruhani31)**
- **[Kush Deo Shukla](https://github.com/Kushdeoshukla08)**
