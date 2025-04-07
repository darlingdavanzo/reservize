import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </Router>
  );
}

const HomePage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Reserve Your Table Easily!</h1>
    <p className="text-lg text-gray-700 mb-8 max-w-lg text-center">
      Manage your restaurant reservations effortlessly with Reservize. Streamline bookings,
      improve your customer experience, and maximize your business potential.
    </p>
    <Link
      to="/reservation"
      className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
    >
      Try out our reservation system
    </Link>
  </div>
);

export default App;
