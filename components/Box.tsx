import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";

// Decent Mint Fees:
// Optimism: .00044
// Arbitrum: .00044
// Polygon: .81
// Mainnet: .00077

const Box = (props:any):JSX.Element => {
  const [quantity, setQuantity] = useState(1);

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    <div className="pb-6">
        {/* TODO: update for max tokens from contract data */}
        <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10000} />
    </div>
    <TheBox
    className={`${props.className}`}
    signer={props.signer || null}
    nftParams={{
      address: props.nftAddress,
      chainId: props.chainId,
      paymentToken: ethers.constants.AddressZero,
      mintParams: {
        abi: "function mint(address to,uint256 numberOfTokens) payable",
        params: [props.walletAddress, props.quantity],
        cost: ethers.utils.parseEther(props.price).add(ethers.utils.parseEther(".00044")).mul(quantity),
        endSupply: {
          maxCap: 99999999999,
        }
      },
      displayCost: "0.00044 ETH" 
    }}
    options={{
      allowSecondary: false,
      allowPrimary: true,
      allowBridging: true,
      allowSwapping: true
    }}
    onTxReceipt={() => toast.success("Successfully minted!")}
    apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
  /> 
  </div>
};

export default Box;