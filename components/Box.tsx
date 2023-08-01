import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount, useSigner } from "wagmi";
import { getContractFee } from "../lib/getContractFee";

{/* IMPORTANT UPDATE: need to make sure the mint params are valid for your NFT.  The information below is works for all Decent NFTs & should serve as a good example of what correct inputs look like.  If you are using a Decent NFT, you do not need to change this!  If you are not, then you do need to update the abi and params -- the rest of the information SHOULD be set in getStaticProps on index.tsx, but be sure to double check. */}

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner();
  const [quantity, setQuantity] = useState(1);

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    {/* Can delete maxQuantity if you do not want to limit the number of NFTs a person can mint at once */}
    <div className="pb-6">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
    {/* ----------------------------------------------------------- */}
    <TheBox
      className={`${props.className}`}
      signer={signer || null}
      nftParams={{
        address: '0x023Aafc1155c700CdefAb18547e37038Ad92720C',
        chainId: 137,
        // paymentToken: ethers.constants.AddressZero,
        mintParams: {
          // abi: 'function mint(bytes32 r,bytes32 s,uint8 v) payable',
          abi: 'function executeMetaTransaction(address userAddress,bytes memory functionSignature,bytes32 sigR,bytes32 sigS,uint8 sigV) payable',
          params: [
            '0xB21e3Bcaf3b670904cFc482eB3eb1880f3eD2A0a',
            '0x963084a000000000000000000000000033d73cc0e060939476a10e47b86a4568c7dcf261000000000000000000000000000000000000000000000000000000000000000073844de878b61e429f1030cbdebf8e7831a06649828d50e0b6bcd51d653e59956e9582c0d42aa47587892a5de77b4b58494a52bceb01f59a0114c4d0cadb7b6c000000000000000000000000000000000000000000000000000000000000001b',
            '0x2f2f941486d24f0b682f89968c97702e316a3fa698add114c87f843456d0467f',
            '0x5f0cd1a4c8cb1232578891ea937f5e02ce5ce6e5cce174c33116012f65be0389',
            28
          ],
          cost: 0,
          endSupply: {
            maxCap: 10,
          },
        },
        title: 'test box polygon token campaign pay on arb',
        displayCost: '0 MATIC',
      }}
      options={{
        allowSecondary: true,
        allowPrimary: true,
        allowBridging: true,
        allowSwapping: true
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    {/* ----------------------------------------------------------- */}
  </div>
};

export default Box;