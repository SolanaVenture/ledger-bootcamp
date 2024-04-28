export interface Organizer {
  wallet_address: string;
  name: string;
  created_at: string;
  active: boolean;
}

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