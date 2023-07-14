import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { WalletContext } from "../lib/contexts/WalletContext";
import { useContext } from "react";

enum Chains {
  optimism = 10,
  arbitrum = 42161,
  polygon = 137,
  ethereum = 1,
}

enum MintFees {
  optimism = "0.00044",
  arbitrum = "0.00044",
  polygon = "0.81",
  ethereum = "0.00077",
}

const Box = (props:any):JSX.Element => {
  const { signer, address, chain } = useContext(WalletContext);

  console.log(props.address, props.chainId)

  // Keep test NFT as one to be minted across various live Box components within the site.
  return <>
    <TheBox
    className={`${props.className}`}
    signer={signer || null}
    nftParams={{
      address: props.address,
      chainId: props.chainId,
      paymentToken: ethers.constants.AddressZero,
      mintParams: {
        abi: "function mint(address to,uint256 numberOfTokens) payable",
        params: [address, props.quantity],
        cost: ethers.utils.parseEther(props.price).add(ethers.utils.parseEther("0.00044")).mul(props.quantity), // optimism mint fee for decent contract
        endSupply: {
          maxCap: 4294967295,
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
  </>
};

export default Box;