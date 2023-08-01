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
        address: '0x151611535DDc74d54e7c2e56B78D35865a77e72C',
        chainId: 137,
        // paymentToken: ethers.constants.AddressZero,
        mintParams: {
          // abi: 'function mint(bytes32 r,bytes32 s,uint8 v) payable',
          abi: 'function executeMetaTransaction(address userAddress,bytes memory functionSignature,bytes32 sigR,bytes32 sigS,uint8 sigV) payable',
          params: [
            '0xc1E8c14df902f4F5b97622B08BC4B052A64c0e2c',
            '0x1b424fed28f82578826be7395f6c86bfa87eef65c0ed34becbed6bfb3532a968aee60fc5681dbdc0d192bfe35af9bd253250769563f17a3d722866ad0de10977b9362ee5000000000000000000000000000000000000000000000000000000000000001c',
            '0xb19be905eba55023795d2434031433f7c93ecd4095c1b059c1085c98115c9439',
            '0x68102f2efe8e453747d8aa6b316b21301be554a878893e38aede681096403a59',
            27
          ],
          cost: ethers.utils.parseEther('0.75'),
          endSupply: {
            maxCap: 10,
          },
        },
        title: 'test box polygon pay on arb',
        displayCost: '0.75 MATIC',
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