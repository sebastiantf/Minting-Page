import { DecentSDK, edition } from "@decent.xyz/sdk";
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import handleTxError from "../lib/handleTxError";
import NumberTicker from "./NumberTicker";
import MarketplaceButtons from "./MarketplaceButtons";

const MintButton = (props:any) => {
  const { ready, authenticated, linkWallet, user, linkEmail, unlinkEmail } = usePrivy();
  const [isMinting, setIsMinting] = useState(false);

  const provider = authenticated && new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider ? provider.getSigner() : null;

  const onSigning = (isMinting:boolean) => {
    setIsMinting(isMinting || false);
  };

  const onSuccess = (receipt:any) => {
    if (receipt) setIsMinting(false);
  };

  const onSuccessfulMint = async (receipt:any) => {
    onSuccess?.(receipt);
    toast.success("Minted successfully. Please fill out form below to receive your physical goods!");
  }

  const mint = async () => {
    if (signer) {
      try {
        onSigning?.(true);
        const sdk = new DecentSDK(props.chainId, signer as any);
        const price:number = props.price * props.quantity;
        const nftOne = await edition.getContract(sdk, props.contractAddress);
        const tx = await nftOne.mint(props.quantity, { value: ethers.utils.parseEther(price.toString()) });
        const receipt = await tx.wait();
        await onSuccessfulMint(receipt);
      } catch (error) {
        handleTxError(error);
        onSigning?.(false);
      }
    } else {
      toast.error("Please connect wallet to continue.");
      if (ready && authenticated) {
        linkWallet();
      }
    }
  }

  return<>
    {!user?.email?.address ? 
    <div className="space-y-4">
      <button onClick={linkEmail} className="bg-white hover:bg-opacity-80 hover:drop-shadow-md text-indigo-700 px-5 py-1 rounded-full font-[600] w-full text-lg uppercase">Link Email</button>
      <p className="text-red-500 font-medium tracking-widest text-sm">Please confirm your email address to mint.</p>
    </div>
     :
    <div className="flex gap-4 py-2 items-center px-4 sm:px-0"> 
      <button disabled={!user?.email?.address} className={`${!user?.email?.address ? 'bg-gray-400 text-black' : 'bg-white hover:bg-opacity-80 hover:drop-shadow-md' } text-indigo-700 px-5 py-1 rounded-full font-[600] w-full text-lg uppercase`} onClick={mint}>{isMinting ? "..." : "Mint"}</button>
      <NumberTicker quantity={props.quantity} setQuantity={props.setQuantity} />
      <MarketplaceButtons openseaLink={props.openseaLink} />
    </div>
    }
  </>;
};

export default MintButton;