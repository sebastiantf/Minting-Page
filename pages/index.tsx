import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';
import Toggle from '../components/Toggle';
import { getReleaseDetails } from '../lib/getReleaseDetails';
import getIpfsLink from "../lib/getIpfsLink";

const Home: NextPage = (props: any) => {
  const [creditCard, setCreditCard] = useState(true);
  const [mintQuantity, setMintQuantity] = useState(1);

  return (
    <div className={`${styles.container}`}>
    <Head>
      <title>{props.contractData.data.name}</title>
      <meta
        name="description"
        content={`${props.contractData.metadata.description}`}
      />
      <link rel="icon" href={getIpfsLink(props.contractData.metadata.image)} />
    </Head>

    <main className={`${styles.main} lg:mx-20 sm:mx-10 xs:mx-2`}>
      <div className='lg:flex items-start lg:gap-20 gap-12 lg:mt-20 mt-12'>
        <div className='lg:max-w-1/2 w-full lg:mx-20'>
          <h1 className={`${styles.title} font-[600]`}>Custom Mint Tutorial</h1>
          <div className={`${styles.description} font-[300]`}>
            {`Showing how easy it is to setup a custom mint site with Decent.`}
          </div>
          <div className='px-10 w-72 space-y-1 p-2 border border-white rounded-md'>
            <div className='grid grid-cols-2'><p>Price:</p><p className='text-right'>{props.contractData.data.tokenPrice} MATIC</p></div>
            <div className='grid grid-cols-2'>
              <p>Minted:</p>
              <p className='text-right'>{props.contractData.data.totalSupply} / {props.contractData.data.MAX_TOKENS > 99999999 ? "Open" : props.contractData.data.MAX_TOKENS}</p>
            </div>
          </div>
        </div>

        <div className='flex w-full justify-center mt-12 lg:mt-0'>
          <div className='text-center space-y-3 w-96'>
            <div className='h-96 relative'>
              <div style={{ height: "100%", width: "100%" }}>
                <Image className="rounded-lg drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} object-fit="contain" fill alt={'nft'} />
              </div>
              {!!props.contractData.metadata.animation_url && <audio className='absolute absolute bottom-2 left-1/2 transform -translate-x-1/2 h-8' controls src={getIpfsLink(props.contractData.metadata.animation_url)}></audio>}
              </div>
            <MintButton 
              chainId={props.contractData.chainId} 
              contractAddress={props.contractData.address} 
              price={parseFloat(props.contractData.data.tokenPrice)} 
              setQuantity={setMintQuantity} 
              quantity={mintQuantity} 
              decentLink={'https://hq.decent.xyz/137/Editions/0xC6FeCF72687baA1dC1584d0Af26227858895D38c'} 
              state={creditCard} 
              clientId={process.env.NEXT_PUBLIC_GOLDEN_HOUR_CLIENTID} 
            />
            <Toggle state={creditCard} setState={setCreditCard} />
          
        </div>
        </div>
      </div>
    </main>

    {/* would appreciate the footer s/o but do what you will 🤝 */}
    <footer className='py-4 border-t border-black justify-center flex items-center'>
      <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
      <Link href="http://decent.xyz/" className='pt-1'>
        <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
      </Link>
    </footer>
  </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const CHAINID = 137;
  const CONTRACT_ADDRESS = '0xC6FeCF72687baA1dC1584d0Af26227858895D38c';
  let contractData = await getReleaseDetails(CHAINID, CONTRACT_ADDRESS)
  return {
    props: {
      contractData
    },
  };
};