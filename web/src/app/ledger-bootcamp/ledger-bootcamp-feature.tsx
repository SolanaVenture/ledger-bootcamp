import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useLedgerBootcampProgram } from './ledger-bootcamp-data-access';
import {
  LedgerBootcampCreate,
  LedgerBootcampProgram,
} from './ledger-bootcamp-ui';

export default function LedgerBootcampFeature() {
  const { publicKey } = useWallet();
  const { programId } = useLedgerBootcampProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="LedgerBootcamp"
        subtitle={'Run the program by clicking the "Run program" button.'}
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
