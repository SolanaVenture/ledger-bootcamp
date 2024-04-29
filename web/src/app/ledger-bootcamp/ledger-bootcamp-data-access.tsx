import { programId, LedgerBootcampIDL } from '@ledger-bootcamp/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useLedgerBootcampProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(LedgerBootcampIDL, programId, provider);

  const wallet = useWallet();

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const greet = useMutation({
    mutationKey: ['ledgerBootcamp', 'greet', { cluster }],
    mutationFn: (keypair: Keypair) => program.methods.greet().rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program'),
  });

  const initBootcampEscrow = useMutation({
    mutationKey: ['ledgerBootcamp', 'initBootcampEscrow', { cluster }],
    mutationFn: (args: { bootcampId: string }) => {
      const { bootcampId } = args;

      if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
      }

      const walletPublicKey = new PublicKey(wallet.publicKey);
      const [escrowPDA] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('escrow'), walletPublicKey.toBuffer()], // seed
        programId
      );

      return program.methods
        .initBootcampEscrow(bootcampId)
        .accounts({
          escrow: escrowPDA,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program initBootcampEscrow'),
  });

  return {
    program,
    programId,
    getProgramAccount,
    greet,
    initBootcampEscrow,
  };
}
