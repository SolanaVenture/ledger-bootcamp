import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useLedgerBootcampProgram } from './ledger-bootcamp-data-access';
import {
  LedgerBootcampCreate,
  LedgerBootcampProgram,
} from './ledger-bootcamp-ui';
import axios from 'axios';

interface Organizer {
  wallet_address: string;
  name: string;
  created_at: string;
  active: boolean;
}

export default function LedgerBootcampFeature() {
  const { publicKey } = useWallet();
  const { programId } = useLedgerBootcampProgram();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);

  useEffect(() => {
    if (publicKey) {
      axios
        .get(`http://localhost:4000/organizer/${publicKey}`)
        .then((response) => {
          // console.log('Organizer', response.data);
          setOrganizer(response.data);
        })
        .catch((error) => {
          console.error('Could not retrieve organizer', error);
        });
    }
  }, [publicKey]);

  return publicKey ? (
    <div>
      <AppHero
        title="LedgerBootcamp"
        subtitle={`Welcome organizer! ${organizer?.name}`}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <LedgerBootcampCreate />
      </AppHero>
      <LedgerBootcampProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
