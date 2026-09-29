# DormMate — Campus Roommate & Housing Finder

A production-ready React web application for university students to find compatible roommates, explore campus housing, interact with property blueprints, and get AI-powered recommendations.

## 🎯 Features

- Roommate matching with filters by major, budget, sleep habits, and compatibility score
- Campus housing listings with distance filters and map view
- Interactive floor-plan blueprint modal with clickable bedroom selection
- AI Matchmaker widget that parses natural language prompts
- Compatibility quiz to dynamically recalibrate match quality
- Direct message modal with simulated live chat and auto-responses
- Saved shortlist drawer for favorite profiles and listings
- Post-sublet form that dynamically injects new housing entries into state
- Roommate agreement builder for quiet hours, cleaning routines, and guest policy
- Database/API settings modal with PostgreSQL schema and Supabase-ready inputs
- .edu verification modal and modern dark UI for campus-focused use

## 🛠 Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React
- Leaflet.js
- LocalStorage-ready mock data structure

## 📦 Installation

```bash
git clone https://github.com/ashtach-hue/dormmate.git
cd dormmate
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```text
dormmate/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   └── App.jsx
├── README.md
└── .gitignore
```

## 🎨 UI/UX Notes

- Dark slate theme with indigo/violet accents
- Responsive cards and panels for mobile and desktop
- Floating AI assistant for quick filtering and discovery
- Toast notifications for actions like save, publish, sync, and reserve
- Map and blueprint interactions built to mirror a campus property marketplace

## 🔍 Mock Data Included

- Roommate profiles with majors, year, budget, sleep habit, cleanliness score, and tags
- Housing listings with distance to campus, landmark proximity, pricing, and room availability
- AI prompts for roommate and property discovery

## 📌 Current Status

This app is a single-file React implementation focused on a polished UX and end-to-end feature simulation for a student housing platform.

## 🧩 Future Enhancements

- Real Supabase/PostgreSQL integration
- Authentication and student identity verification flow
- Photo uploads and listing management
- Real map routing and distance calculations
- Live messaging backend
- Payment/deposit workflows for rentals

## 📄 License

Open source and ready for customization.
