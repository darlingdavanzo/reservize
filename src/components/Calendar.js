import React, { useState, useEffect } from 'react';

const Calendar = ({ selectedDate, setSelectedDate, fullyBookedDays, hasScrolled, setHasScrolled }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth, currentYear);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfWeek = days[0].getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.unshift(null);
  }

  const handlePreviousMonth = () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setHasScrolled(true); // Allow free navigation after initial scroll
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setHasScrolled(true); // Allow free navigation after initial scroll
  };

  const isPastDate = (date) => {
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayDate;
  };

  useEffect(() => {
    const selectedDateObj = new Date(selectedDate);
    if (!hasScrolled && (selectedDateObj.getMonth() !== currentMonth || selectedDateObj.getFullYear() !== currentYear)) {
      setCurrentMonth(selectedDateObj.getMonth());
      setCurrentYear(selectedDateObj.getFullYear());
    }
  }, [selectedDate, currentMonth, currentYear, hasScrolled, setHasScrolled]);

  return (
    <div data-month={currentMonth} data-year={currentYear} className="calendar-month">
      <div className="flex justify-between mb-4">
        <div className="w-1/3 text-left">
          {!(currentMonth === today.getMonth() && currentYear === today.getFullYear()) && (
            <button onClick={handlePreviousMonth} className="text-green-500 font-bold">
              &larr; Prev
            </button>
          )}
        </div>
        <div className="text-lg font-semibold text-center w-1/3">
          {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
        </div>
        <div className="w-1/3 text-right">
          <button onClick={handleNextMonth} className="text-green-500 font-bold">
            Next &rarr;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold text-gray-700">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="p-2 text-sm text-gray-400" />;
          }

          const dateString = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
          const isBooked = fullyBookedDays[dateString];
          return (
            <button
              key={dateString}
              onClick={() => !isBooked && !isPastDate(day) && setSelectedDate(dateString)}
              className={`p-2 text-sm rounded-lg border ${
                selectedDate === dateString
                  ? 'bg-green-500 text-white'
                  : isBooked || isPastDate(day)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-900'
              }`}
              disabled={isBooked || isPastDate(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
