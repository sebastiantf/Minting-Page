import { createContext, ReactNode, useEffect } from "react";
import { useAccount, useSigner, useNetwork } from 'wagmi';

interface WalletContextInterface {
  signer: any | undefined;
  address: any | undefined;
  chain: any | undefined;
  isLoading: boolean | undefined;
  isError: boolean | undefined;
}

export const WalletContext = createContext<WalletContextInterface>({
  address: null,
  signer: null,
  chain: null,
  isLoading: undefined,
  isError: undefined,
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { data: signer, isLoading, isError } = useSigner();
  const { address: address } = useAccount();
  const { chain } = useNetwork();

  return (
    <WalletContext.Provider value={{ signer, isLoading, isError, address, chain }}>
      {children}
    </WalletContext.Provider>
  );
};
