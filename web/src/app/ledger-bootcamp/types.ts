export interface Organizer {
  wallet_address: string;
  name: string;
  created_at: string;
  active: boolean;
}

// for input
export interface Bootcamp {
  name: string;
  owner: string;
  owner_name: string;
  description: string;
  duration: number;
  start_date: string;
  end_date: string;
  deposit_amount: number;
  active: boolean;
  refunded: boolean;
}

// db result with _id
export interface BootcampWithId extends Bootcamp {
  _id: number;
  students?: string[];
}