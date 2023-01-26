import { DecentSDK, edition } from "@decent.xyz/sdk";
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import handleTxError from "../lib/handleTxError";
import NumberTicker from "./NumberTicker";
import MarketplaceButtons from "./MarketplaceButtons";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

const MintButton = (props:any) => {
  const { ready, authenticated, linkWallet } = usePrivy();
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
    props.setShowTypeform(true);
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
  return <div className="flex gap-4 py-2 items-center px-4 sm:px-0 justify-between mx-4">
    {props.state ?
      <>
        <CrossmintPayButton
          clientId={props.clientId}
          environment="production"
          className="xmint-btn"
          mintConfig={{
            type: "erc-721",
            totalPrice: (props.price * props.quantity).toString(),
            numberOfTokens: props.quantity
          }}/>
      </>
      : <>
      <button className="bg-white hover:bg-opacity-80 hover:drop-shadow-md text-indigo-700 px-5 py-1 rounded-full font-[600] w-full text-lg uppercase" onClick={mint}>{isMinting ? "..." : "Mint"}</button>
      </>
      }
      <NumberTicker quantity={props.quantity} setQuantity={props.setQuantity} />
      <MarketplaceButtons openseaLink={props.openseaLink} />
    </div>;
};

export default MintButton;