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
            '0x963084a0000000000000000000000000fb5b21c1d090d40a29cd7bb9bbe3eba9e8f06b910000000000000000000000000000000000000000000000000000000000000001d6846230b62a5184b808480075de27ebe53f30f25e634c434995bd8c5455544a556997b5f586fa99f84095fad2b0e1f07fa99ebe11f7f2ea715740c30c7af4d9000000000000000000000000000000000000000000000000000000000000001c',
            '0xd33a6f03d1c131679afa7ab50a279e20ebfc4ba49c926e33830638a739fc63e2',
            '0x2192c46634dc293edd714c847fa535c645d88210b1709e251b959d57861b4629',
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