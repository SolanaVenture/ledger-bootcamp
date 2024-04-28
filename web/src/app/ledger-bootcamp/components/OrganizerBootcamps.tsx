import { BootcampWithId } from '../types';

const OrganizerBootcamps = ({ bootcamps }: { bootcamps: BootcampWithId[] }) => {
  return (
    <div className="mb-6 border-2 border-grey-50 p-5">
      <h2 className="text-2xl mb-2">Bootcamps you have created</h2>
      {bootcamps.map((bootcamp: BootcampWithId) => (
        <div key={bootcamp._id} className="mb-4">
          <h3 className="text-lg font-semibold">{bootcamp.name}</h3>
          <p>{bootcamp.description}</p>
          <p>Duration: {bootcamp.duration} days</p>
          <p>Start date: {bootcamp.start_date}</p>
          <p>End date: {bootcamp.end_date}</p>
          <p>Deposit amount: {bootcamp.deposit_amount} Lamports</p>
          <p>Active: {bootcamp.active ? 'Yes' : 'No'}</p>
          <p>Refunded: {bootcamp.refunded ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};
export default OrganizerBootcamps;
