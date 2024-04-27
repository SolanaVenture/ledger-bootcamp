import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { LedgerBootcamp } from '../target/types/ledger_bootcamp';

describe('ledger-bootcamp', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.LedgerBootcamp as Program<LedgerBootcamp>;

  it('should run the program', async () => {
    // Add your test here.
    const tx = await program.methods.greet().rpc();
    console.log('Your transaction signature', tx);
  });
});
