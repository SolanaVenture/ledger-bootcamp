import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BootcampWithId } from '../types';
import { useWallet } from '@solana/wallet-adapter-react';

const EnrolBootcamp = () => {
  const [availableBootcamps, setAvailableBootcamps] = useState([]);
  const [message, setMessage] = useState('');

  const wallet = useWallet();

  useEffect(() => {
    const fetchAvailableBootcamps = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/enrollable/bootcamps'
        );
        // console.log('Available bootcamps', response.data);
        setAvailableBootcamps(response.data);
      } catch (error) {
        console.error('Could not retrieve available bootcamps', error);
      }
    };

    fetchAvailableBootcamps();
  }, []);

  const handleEnrol = async (bootcampId: string) => {
    // console.log('bootcampId', bootcampId);
    // console.log('Enrolling student', wallet.publicKey?.toString());
    try {
      const response = await axios.put(
        `http://localhost:4000/bootcamp/${bootcampId}/student`,
        { student: wallet.publicKey?.toString() }
      );

      console.log(response.data);

      setMessage(
        `Student wallet address ${wallet.publicKey?.toString()} has been enrolled in bootcamp (${
          response.data.name
        }) ${response.data._id}`
      );
    } catch (error) {
      console.error('Failed to enrol student', error);
    }
  };

  return (
    <div className="mb-6 border-2 border-grey-50 p-5">
      <h2 className="text-2xl mb-2">Enrol Bootcamps!</h2>
      {availableBootcamps.map((bootcamp: BootcampWithId) => (
        <div key={bootcamp._id} className="mb-4">
          <h3 className="text-lg font-semibold">{bootcamp.name}</h3>
          <p>{bootcamp.description}</p>
          <p>Duration: {bootcamp.duration} days</p>
          <p>Start date: {bootcamp.start_date}</p>
          <p>End date: {bootcamp.end_date}</p>
          <p>Deposit amount: {bootcamp.deposit_amount} Lamports</p>
          <p>Active: {bootcamp.active ? 'Yes' : 'No'}</p>
          <p>Refunded: {bootcamp.refunded ? 'Yes' : 'No'}</p>
          <button
            className="btn btn-accent"
            onClick={() => handleEnrol(String(bootcamp._id))}
          >
            Enrol
          </button>
        </div>
      ))}
      {message && <p className="mt-4 text-info">{message}</p>}
    </div>
  );
};

export default EnrolBootcamp;
