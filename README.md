# 🌍 AQI Search Engine

A full-stack web application that provides real-time Air Quality Index (AQI) monitoring for cities worldwide. It features a responsive UI with data visualization and a high-performance backend with caching strategies to minimize API latency.

## 🚀 Features

- **Real-Time Data:** Fetches live air quality data (PM2.5, PM10, Ozone, etc.) using the WAQI API.
- **Smart Caching:** Implements server-side caching (`node-cache`) to store city data for 1 hour, significantly reducing external API calls and loading times.
- **Interactive UI:**
  - **Autocomplete Search:** Type-ahead suggestions for thousands of cities.
  - **Data Visualization:** Color-coded AQI cards and bar charts for pollutant analysis.
- **Robust Error Handling:** Gracefully handles invalid cities and network failures.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Chart.js / React-Chartjs-2
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Caching:** Node-cache (In-memory)
- **Security:** Helmet & CORS
- **HTTP Client:** Axios
  
## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)
- An API Key from [AQICN](https://aqicn.org/data-platform/token/)

### 1. Backend Setup
Navigate to the backend folder and install dependencies:

cd backend
npm install

Create a .env file in the backend folder and add your API Key:

Code snippet

PORT=8080
AQI_API_KEY=your_actual_api_token_here
Start the backend server:

npm start
# Server runs on http://localhost:8080
2. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

cd frontend
npm install
Start the React application:

Bash

npm run dev
# Application runs on http://localhost:5173
🧪 How to Test Caching
Open the backend terminal to see live logs.
Search for a city (e.g., "Mumbai") in the frontend.
First Request: You will see [Cache Miss] Fetching from External API....
Search for "Mumbai" again immediately.
Second Request: You will see [Cache Hit] Serving from cache.
Result: The data loads instantly without hitting the external API.

📸 Screenshots
Developed by Kunal Kherde

<img width="1365" height="680" alt="Screenshot 2025-12-31 234904" src="https://github.com/user-attachments/assets/16b91d31-3d56-4e52-8c68-1420dbf47cfd" />
<img width="1359" height="681" alt="Screenshot 2025-12-31 235015" src="https://github.com/user-attachments/assets/8d504f73-c051-464e-867b-8c655eb631d1" />

### Step 3: Final Push
Now that you have added the README, update your GitHub repository one last time:
git add README.md
git commit -m "Added project documentation"
git push origin main
