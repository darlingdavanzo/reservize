import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-semibold text-green-600">Reservation Successful!</h2>
      <p className="text-gray-700">Your reservation has been successfully added.</p>
        <p>Make Another Reservation</p>    
    </div>
  );
};

export default SuccessMessage;
