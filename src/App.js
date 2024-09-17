import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// A placeholder for the home page component (you can replace it with your actual home page)
const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-900">Welcome to Reservize!</h1>
    <p className="mt-4 text-lg text-gray-700">Navigate to /reservation to make a reservation.</p>
  </div>
);

export default App;
