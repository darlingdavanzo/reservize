import React, { useState, useCallback, useEffect } from 'react';
import Calendar from '../components/Calendar';
import SuccessMessage from '../components/SuccessMessage';

const Step1 = ({ people, setPeople }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-semibold text-gray-900">Select Number of People</h3>
    <div className="grid grid-cols-4 gap-4">
      {[...Array(8).keys()].map(n => (
        <button
          key={n + 1}
          onClick={() => setPeople(n + 1)}
          className={`p-4 text-xl rounded-lg border ${
            people === n + 1 ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          {n + 1}
        </button>
      ))}
    </div>
    <div className="mt-4">
      <label htmlFor="people-select" className="block text-sm font-medium text-gray-700">
        Or select up to 20 people
      </label>
      <select
        id="people-select"
        value={people > 8 ? people : ''}
        onChange={(e) => setPeople(Number(e.target.value))}
        className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select number of people</option>
        {[...Array(12).keys()].map(n => (
          <option key={n + 9} value={n + 9}>
            {n + 9} persons
          </option>
        ))}
      </select>
    </div>
  </div>
);

const Step2 = ({ date, setDate, time, setTime, fullyBookedDays, fullyBookedTimes, setHasScrolled, hasScrolled }) => {
  
  const handleDateChange = (newDate) => {
    const newDateObj = new Date(newDate);
    const now = new Date();

    // Check if the new date is today
    const isToday = newDateObj.toDateString() === now.toDateString();

    // Check if the selected time is still valid
    const [hour, minute] = time.split(':').map(Number);
    const selectedTimeObj = new Date(newDateObj);
    selectedTimeObj.setHours(hour);
    selectedTimeObj.setMinutes(minute);

    if (
      (isToday && selectedTimeObj <= now) ||  // Reset if the time is in the past on today's date
      fullyBookedTimes[newDate]?.includes(time)  // Reset if the time is fully booked on the new date
    ) {
      setTime(''); // Reset the time if it's not valid
    }

    setDate(newDate); // Update the selected date
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Select Date</h3>
      <Calendar
        selectedDate={date}
        setSelectedDate={handleDateChange}
        fullyBookedDays={fullyBookedDays}
        setHasScrolled={setHasScrolled}
        hasScrolled={hasScrolled}
      />
    </div>
  );
};

const Step3 = ({ date, time, setTime, times, fullyBookedTimes }) => {
    const now = new Date();
    const selectedDate = new Date(date);

    const isToday =
        now.getDate() === selectedDate.getDate() &&
        now.getMonth() === selectedDate.getMonth() &&
        now.getFullYear() === selectedDate.getFullYear();

    return (
        <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900">Select Time Slot</h3>
        <div className="grid grid-cols-3 gap-4">
            {times.map(timeOption => {
            const [hour, minute] = timeOption.split(':').map(Number);
            const tDate = new Date(selectedDate);
            tDate.setHours(hour);
            tDate.setMinutes(minute);

            const isDisabled =
                (isToday && tDate <= now) || fullyBookedTimes[date]?.includes(timeOption);

            return (
                <button
                key={timeOption}
                onClick={() => !isDisabled && setTime(timeOption)}
                className={`p-4 text-xl rounded-lg border ${
                    time === timeOption ? 'bg-green-500 text-white' : 'bg-gray-200'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDisabled}
                >
                {timeOption}
                </button>
            );
            })}
        </div>
        </div>
    );
};  

const Step4 = ({ name, setName, email, setEmail, phone, setPhone }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-semibold text-gray-900">Enter Your Information</h3>
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Your Name"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="you@example.com"
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        autoComplete="tel"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="(123) 456-7890"
      />
    </div>
  </div>
);

const ReviewStep = ({ name, date, time, people, email, phone }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Your reservation overview</h3>
      <div>
        <p className="text-lg"><strong>First Name:</strong> {name}</p>
        <p className="text-lg"><strong>Day:</strong> {formattedDate} at {time}</p>
        <p className="text-lg"><strong>People:</strong> {people}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Phone Number:</strong> {phone}</p>
      </div>
      <div className="mt-4">
        <p>If the details are correct, press 'Reserve Now' to send the request.</p>
      </div>
    </div>
  );
};

const ReservationPage = () => {
  const [step, setStep] = useState(1);
  const [people, setPeople] = useState(2);
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reservations, setReservations] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); 
  const [warningMessage, setWarningMessage] = useState('');

  const fullyBookedDays = {
    '2024-08-15': true,
    '2024-08-20': true,
  };

  const fullyBookedTimes = {
    '2024-08-18': ['12:00', '13:00'],
  };

  const times = [
    '12:00',
    '13:00',
    '14:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  const validateStep = useCallback((stepNumber) => {
    if (stepNumber === 1) return people > 0;
    if (stepNumber === 2) return date !== '';
    if (stepNumber === 3) return date !== '' && time !== '';
    if (stepNumber === 4) return date !== '' && time !== '' && name !== '' && email !== '' && phone !== '';
    if (stepNumber === 5) return date !== '' && time !== '' && name !== '' && email !== '' && phone !== '';
    return false;
  }, [people, date, time, name, email, phone]);

  const showWarning = (message) => {
    setWarningMessage(message);
    setTimeout(() => setWarningMessage(''), 3000); // Hide the warning after 3 seconds
  };

  const handleBulletClick = (stepNumber) => {
    if (stepNumber === 1 || validateStep(stepNumber - 1)) {
      setStep(stepNumber);
      if (stepNumber === 2) {
        setHasScrolled(false); // Reset scroll state when re-entering step 2
      }
    } else {
      showWarning('Please complete the required steps before proceeding.');
    }
  };

  const handleNextStep = useCallback(() => {
    if (validateStep(step)) {
      setStep(step + 1);
      if (step + 1 === 2) {
        setHasScrolled(false); // Reset scroll state when navigating to step 2
      }
    } else {
      showWarning('Please complete the required steps before proceeding.');
    }
  }, [step, validateStep]);

  const handlePreviousStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
      if (step - 1 === 2) {
        setHasScrolled(false); // Reset scroll state when navigating back to step 2
      }
    }
  }, [step]);

  const handleSubmitReservation = useCallback(() => {
    const newReservation = {
      people,
      date,
      time,
      name,
      email,
      phone,
    };
    setReservations([...reservations, newReservation]);
    setIsSubmitted(true);
  }, [people, date, time, name, email, phone, reservations]);

  // Ensure calendar shows the selected date's month when navigating to step 2
  useEffect(() => {
    if (step === 2 && !hasScrolled) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const calendarMonthElement = document.querySelector(`.calendar-month[data-month='${month}'][data-year='${year}']`);
      if (calendarMonthElement) {
        calendarMonthElement.scrollIntoView({ behavior: 'smooth' });
        setHasScrolled(true); // Mark as scrolled to prevent future auto-scrolls
      }
    }
  }, [step, date, hasScrolled]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hero Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://placehold.co/800x600"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
          {isSubmitted ? (
            <SuccessMessage />
          ) : (
            <>
              <div className="flex justify-between mb-8">
                {step > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Previous
                  </button>
                )}
                {step < 5 && (
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    style={{ marginLeft: step === 1 ? 'auto' : '0' }}
                  >
                    Next
                  </button>
                )}
              </div>

               {/* Display warning message */}
               {warningMessage && (
                <div className="mb-4 text-red-500 text-center">
                  {warningMessage}
                </div>
              )}    

              {step === 1 && <Step1 people={people} setPeople={setPeople} />}
              {step === 2 && <Step2 date={date} setDate={setDate} time={time} setTime={setTime} fullyBookedDays={fullyBookedDays} fullyBookedTimes={fullyBookedTimes} setHasScrolled={setHasScrolled} hasScrolled={hasScrolled} />}
              {step === 3 && (
                <Step3
                  date={date}
                  time={time}
                  setTime={setTime}
                  times={times}
                  fullyBookedTimes={fullyBookedTimes}
                />
              )}
              {step === 4 && (
                <Step4
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                />
              )}
              {step === 5 && (
                <>
                  <ReviewStep
                    name={name}
                    date={date}
                    time={time}
                    people={people}
                    email={email}
                    phone={phone}
                  />
                  <button
                    type="button"
                    onClick={handleSubmitReservation}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-6"
                  >
                    Reserve Now
                  </button>
                </>
              )}
            </>
          )}
          {!isSubmitted && (
            <div className="flex items-center justify-center space-x-4 mt-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-3 w-3 rounded-full cursor-pointer ${
                    step === s ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() => handleBulletClick(s)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
