import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const DatepickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/save_selected_date', {
        selectedDate: selectedDate.toISOString() // Sending date in ISO format
      });
      console.log(response.data); // Assuming Django sends back some response
    } catch (error) {
      console.error('Error sending data to Django:', error);
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DatepickerComponent;