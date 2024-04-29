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
import OrganizerBootcamps from './components/OrganizerBootcamps';
import axios from 'axios';
import BootcampForm from './components/BootcampForm';
import { Organizer, BootcampWithId } from './types';
import EnrolBootcamp from './components/EnrolBootcamp';

export default function LedgerBootcampFeature() {
  const { publicKey } = useWallet();
  const { programId } = useLedgerBootcampProgram();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [bootcamps, setBootcamps] = useState<BootcampWithId[]>([]);

  useEffect(() => {
    if (publicKey) {
      axios
        .get(`http://localhost:4000/organizer/${publicKey}`)
        .then((response) => {
          console.log('Organizer', response.data);
          if (response.data !== 'Not found') {
            setOrganizer(response.data);
          }
        })
        .catch((error) => {
          console.error('Could not retrieve organizer', error);
        });
    }
  }, [publicKey]);

  useEffect(() => {
    if (organizer) {
      axios
        .get(`http://localhost:4000/bootcamps/${organizer.wallet_address}`)
        .then((response) => {
          console.log('Bootcamps', response.data);
          setBootcamps(response.data);
        })
        .catch((error) => {
          console.error('Could not retrieve bootcamps', error);
        });
    }
  }, [organizer]);

  console.log('progeamId', programId.toString());

  return publicKey ? (
    <div>
      <AppHero
        title={`Welcome! ${
          organizer ? 'Organizer: ' + organizer.name : 'Visitor'
        }`}
        subtitle="Create and manage your bootcamps"
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
      <div className="mt-6">
        {organizer && <OrganizerBootcamps bootcamps={bootcamps} />}
        {organizer && (
          <BootcampForm
            publicKey={publicKey.toString()}
            ownerName={organizer.name}
            setBootcamps={setBootcamps}
          />
        )}
        <div className="mb-6 border-2 border-grey-50 p-5">
          <h2 className="text-2xl mb-2">Enrolled Bootcamps</h2>
        </div>
        <EnrolBootcamp />
      </div>
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
