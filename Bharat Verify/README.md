# 🛡️ Bharat Verify: AI-Powered Truth Guardian

**Bharat Verify** is a sophisticated, multi-modal content verification platform built for the **AI for Bharat** hackathon. It empowers citizens to identify misinformation, fake news, and manipulated media (Deepfakes) in real-time using cutting-edge Google Gemini AI.

## 🚀 Vision
In an era where misinformation spreads faster than truth, especially across Bharat's diverse linguistic landscape, Bharat Verify serves as a digital shield. Our mission is to democratize digital literacy and provide every citizen with a professional-grade fact-checking tool in their pocket.

## ✨ Key Features

### 🔍 Multi-Modal Analysis
- **Text Verification**: Uses `gemini-3-flash-preview` with **Google Search Grounding** to verify news claims, detect bias, and cite reputable sources.
- **Image Forensics**: Employs `gemini-2.5-flash-image` to detect digital manipulation, splicing, and AI-generated artifacts in viral photos.
- **Video Deepfake Detection**: Utilizes temporal analysis across video frames to identify synthetic media and "cheapfakes."

### 🎓 Digital Literacy Academy
- **Learning Modules**: Interactive articles on the anatomy of fake news and spotting AI manipulation.
- **Verification Challenge**: A gamified quiz to test and improve users' digital literacy scores.

### 🛡️ Privacy & Persistence
- **Local-First History**: All verification history is stored securely on the user's device using `localStorage`, ensuring zero data footprint on external servers.
- **Anonymous Usage**: No mandatory login required, lowering the barrier for rural and elderly users.

## 🛠️ Technical Stack
- **Frontend**: React 19 (ESM), Tailwind CSS
- **AI Engine**: Google Gemini API (@google/genai)
  - `gemini-3-flash-preview` (Text & Search Grounding)
  - `gemini-2.5-flash-image` (Image Forensics)
  - `gemini-2.5-flash-native-audio-preview-12-2025` (Multimodal Video Analysis)
- **Icons & UI**: FontAwesome 6, Inter Font Family

## 🌍 Impact for Bharat
- **Regional Support**: Designed to handle regional context and common misinformation patterns found in Indian social media circles.
- **Combating Scams**: Helps users verify "miracle cure" claims and fraudulent investment schemes.
- **Election Integrity**: Provides a neutral, AI-driven perspective on political claims.

## 📦 Installation & Setup
1. Clone the repository.
2. Ensure you have a valid Gemini API Key.
3. The application is a pure ES6 module-based React app. Serve the root directory using any local web server (e.g., `npx serve .`).
4. Access the tool at `http://localhost:3000`.

---
*Developed for the AI for Bharat Hackathon. Empowering 1.4 billion citizens with the truth.*