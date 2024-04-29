// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from '@solana/web3.js';
import type { LedgerBootcamp } from '../target/types/ledger_bootcamp';
import { IDL as LedgerBootcampIDL } from '../target/types/ledger_bootcamp';

// Re-export the generated IDL and type
export { LedgerBootcamp, LedgerBootcampIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  '7BqJUqX6jPVifdvNHqJBV2ohtHxMJYz6SS8rezBpkYpS'
);
