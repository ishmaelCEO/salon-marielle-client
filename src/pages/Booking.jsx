import React, { useState } from 'react';
import axios from 'axios';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    service: '',
    date: '',
    time: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://salon-marielle-server-production.up.railway.app/api/booking', form);
      setMessage('✅ Booking submitted successfully!');
      setForm({ name: '', service: '', date: '', time: '' });
    } catch (error) {
      setMessage('❌ Booking failed.');
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="service" placeholder="Service (e.g., Haircut)" value={form.service} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: '1rem' }}>Submit Booking</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
