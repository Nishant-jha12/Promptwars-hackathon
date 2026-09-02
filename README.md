# Census Sahayak 2027

A fully functional, AI-powered digital portal for the upcoming Indian Census 2027.

## Problem Statement Alignment
The goal of this project is to create an intuitive, accessible, and secure platform that facilitates India's transition to a fully digital census. This platform specifically tackles:
1. **Accessibility**: A strict UI/UX design system that is fully responsive, WCAG compliant, and supports 16 languages.
2. **AI Assistance**: "Ask Sahayak" uses the Gemini 3.6 Flash API to explain legal jargon and help citizens self-enumerate, eliminating confusion.
3. **Smart Localization**: GPS-powered State Schedule dashboard uses Nominatim reverse-geocoding to pinpoint field visit dates for citizens.
4. **Data Privacy**: Translates the Census Act of 1948 into plain English. The platform operates on a strict zero-PII storage policy for the self-enumeration wizard.
5. **Efficiency**: Optimized with React.lazy loading, useMemo caching, and Vite build chunking to perform on low-bandwidth networks.

## Features
- Context-Aware Gemini AI Chatbot
- Voice-to-Text Fallback
- Geo-Tagged Rollout Schedule
- Self-Enumeration Wizard (Generates 11-Digit HRN)
- Print-Optimized Summary Receipts
- WhatsApp Native Sharing

## Tech Stack
React, TypeScript, Vite, Tailwind CSS, Google Gemini 3.6 Flash API, OpenStreetMap API, Recharts.
