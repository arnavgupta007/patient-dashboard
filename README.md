# HealthOS — Patient Dashboard

A single-page patient health dashboard built as part of the Coalition Technologies Frontend Skills Test.

Displays patient data for **Jessica Taylor** fetched live from the Coalition Technologies API, including a blood pressure chart, diagnostic history, vital signs, and lab results.
<img width="1912" height="946" alt="image" src="https://github.com/user-attachments/assets/3ef6092d-3369-4563-901a-9098e181cb10" />



---

## Tech Stack

- React 18
- Chart.js + react-chartjs-2
- Vanilla CSS (no UI framework)
- Fetch API for data fetching

---

## Features

- Live API integration with Coalition Technologies patient data API
- Blood pressure trend chart (last 6 months) using Chart.js
- Diagnostic history table with status badges
- Patient vital signs (temperature, heart rate, respiratory rate, BMI)
- Lab results list
- Patient sidebar with full patient list
- Skeleton loading states
- Clean warm clinical UI theme

---

## Project Structure
patient-dashboard/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.jsx                          # Root component, API fetch, state management
│   │
│   ├── services/
│   │   └── api.js                       # API calls and Jessica Taylor filter
│   │
│   ├── components/
│   │   ├── BloodPressureChart.jsx       # Chart.js line chart
│   │   ├── PatientSidebar.jsx           # Left sidebar patient list
│   │   └── PatientProfile.jsx           # Right panel vitals, labs, profile
│   │
│   ├── pages/
│   │   └── Dashboard.jsx               # BP card + diagnosis history
│   │
│   └── styles/
│       └── globals.css                  # CSS variables + all styles
│
├── .gitignore
├── package.json
└── README.md

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org) (v16 or higher)
  
- npm (comes with Node.js)

Check by running:

```bash
node --version
npm --version
```

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/arnavgupta007/patient-dashboard.git
```

**2. Go into the project folder**

```bash
cd patient-dashboard
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm start
```

**5. Open in browser**

The app will automatically open at:
http://localhost:3000

---

## API

This project uses the Coalition Technologies Patient Data API.

- **Endpoint:** `https://fedskillstest.coalitiontechnologies.workers.dev`
- **Method:** GET
- **Auth:** Basic Authentication (`coalition:skills-test`)
- **Data shown:** Jessica Taylor only (filtered from full patient list)

---

## Design

- **Font:** Libre Baskerville (headings) + DM Sans (body)
- **Theme:** Warm Clinical — off-white canvas, sage green accents, dusty rose for alerts
- **No external UI libraries** — all styles written from scratch using CSS variables

---

## Author

Your Name  
[GitHub](https://github.com/arnavgupta007)
