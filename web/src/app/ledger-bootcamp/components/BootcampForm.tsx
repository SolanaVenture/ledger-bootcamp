import React, { useState } from 'react';
import { Bootcamp } from '../types';
import axios from 'axios';

const BootcampForm = ({
  publicKey,
  ownerName,
}: {
  publicKey: string;
  ownerName: string;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bootcamp: Bootcamp = {
      name,
      owner: publicKey,
      owner_name: ownerName,
      description,
      duration,
      start_date: startDate,
      end_date: endDate,
      deposit_amount: depositAmount,
      active: true,
      refunded: false,
    };

    console.log(bootcamp);

    try {
      const response = await axios.post(
        'http://localhost:4000/bootcamp',
        bootcamp
      );
      console.log(response.data);
      setMessage('Form submitted successfully!');

      // Clear form data
      setName('');
      setDescription('');
      setDuration(0);
      setStartDate('');
      setEndDate('');
      setDepositAmount(0);
    } catch (error) {
      console.error(error);
      setMessage('Form submission failed.');
    }
  };

  return (
    <div className="mb-6 border-2 border-grey-50 p-5">
      <h2 className="text-2xl font-bold mb-4">Create a new bootcamp</h2>
      {!showForm && (
        <button className="btn btn-accent" onClick={handleOpenForm}>
          Create a new bootcamp
        </button>
      )}
      {showForm && (
        <div className="mt-6">
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4 flex">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="duration"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                Duration
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="start_date"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                Start Date
              </label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="end_date"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                End Date
              </label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="deposit_amount"
                className="block text-lg font-medium text-gray-700 w-1/4"
              >
                Deposit Amount (Lamports)
              </label>
              <input
                type="number"
                id="deposit_amount"
                name="deposit_amount"
                className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
                required
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="submit" className="btn btn-accent">
                Submit
              </button>
              <button className="btn" onClick={handleCloseForm}>
                Cancel
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-info">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default BootcampForm;
