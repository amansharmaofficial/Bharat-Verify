# Design Document: Bharat Verify

## 1. System Architecture
Bharat Verify follows a **Client-Side Heavy (CSH)** architecture to prioritize user privacy and reduce infrastructure costs.

- **Frontend**: React 19 utilizing ES modules for modern browser compatibility.
- **State Management**: React `useState` for UI state; `localStorage` for persistent verification history.
- **AI Integration**: Direct integration with the `@google/genai` SDK.
- **Forensics Logic**: 
  - Text: Uses `gemini-3-flash-preview` with `googleSearch` tool for real-time verification.
  - Image: Uses `gemini-2.5-flash-image` for visual artifact detection.
  - Video: A custom frame-extraction pipeline extracts keyframes to be analyzed by `gemini-2.5-flash-native-audio-preview-12-2025`.

## 2. Design Principles

### 2.1 Clarity and Trust
Misinformation is often chaotic. The UI uses a clean, structured layout with high-contrast typography (Inter font family) and a "Shield" branding motif to evoke a sense of security and institutional reliability.

### 2.2 The "Truth Meter"
The core visual element is the Truth Meter. It is designed as a sophisticated gauge that provides an immediate "gut check" on content credibility, using a traffic-light color system (Green, Amber, Red).

### 2.3 Mobile-First Interaction
Given Bharat's high mobile penetration, the app features a bottom-navigation bar for mobile users and large, touch-friendly input areas.

## 3. Technology Choices
- **Tailwind CSS**: For rapid, consistent, and responsive styling without bloated CSS files.
- **Gemini 2.5/3.0 Models**: Selected for their multi-modal capabilities and low latency compared to traditional heavy models.
- **FontAwesome**: For recognizable iconography that transcends language barriers.

## 4. Security & Privacy
By utilizing a "Local-First" approach, Bharat Verify ensures that sensitive user queries or potentially incriminating images (in whistleblower contexts) never touch a central database, adhering to the principle of "Privacy by Design".