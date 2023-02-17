import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';
import { DecentSDK, edition } from "@decent.xyz/sdk";
import { ethers } from "ethers";
import Typeform from '../components/Typeform';
import Toggle from '../components/Toggle';

const Home: NextPage = () => {
  const RPC = "https://ethereum-goerli-rpc.allthatnode.com"; //for testing on Ethereum goerli; do not need for mainnet - other chains have different RPC endpoints you'll have to input here if contract is not on Ethereum mainnet

  const CHAINID = 1; //change to 5 to test on goerli
  
  {/* make sure to update for your contract address; if you created your contract through the HQ, you can grab its address off the Success or Admin page */}
  const ANTHOLOGY = '0x5eB804cf3f0c6f97e99631961A53bCad2bbA4851';
  {/* can be deleted if only using 1 contract */}
  const RUFFDRAFT = '0x59aa1D3BB2C6ea9f09A16296718B62D3A4Df0782';
  const MADUKES = '0xF3C6B02F3b5482CDed898C82e08D1fa4Cf0f2D43';

  const [anthologyMints, setAnthologyMints] = useState(0);
  const [ruffdraftMints, setRuffdraftMints] = useState(0);
  const [madukesMints, setMadukesMints] = useState(0);

  const [showTypeForm, setShowTypeform] = useState(false);

  const [anthologyCC, setAnthologyCC] = useState(true);
  const [ruffdraftCC, setRuffdraftCC] = useState(true);
  const [madukesCC, setMadukesCC] = useState(true);
  
  // required to display the mint counts you'll see below
  const updateContractInfo = async () => {
    const provider = ethers.getDefaultProvider(); //add RPC as parameter for goerli
    const sdk = new DecentSDK(CHAINID, provider as any);
    const anthology = await edition.getContract(sdk, ANTHOLOGY);
    const ruffdraft = await edition.getContract(sdk, RUFFDRAFT);
    const madukes = await edition.getContract(sdk, MADUKES);

    setAnthologyMints(parseInt(await anthology.totalSupply()))
    setRuffdraftMints(parseInt(await ruffdraft.totalSupply()));
    setMadukesMints(parseInt(await madukes.totalSupply()));
  }

  // for batch minting
  const [anthologyQuantity, setAnthologyQuantity] = useState(1);
  const [ruffDraftQuantity, setRuffDraftQuantity] = useState(1);
  const [maDukesQuantity, setMaDukesQuantity] = useState(1);

  const anthologyLink:string = "j-dilla-anthology";
  const ruffDraftLink:string = "ruff-draft";
  const maDukesLink:string = "ma-dukes-says";

  useEffect(() => {
    updateContractInfo();
  }, []);

  return (
    <div className={`${styles.container} background`}>
    <Head>
      <title>Mint J Dilla Anthology</title>
      <meta
        name="description"
        content='Custom mint site by decent.xyz for fans to mint NFTs from the J Dilla collection.'
      />
      <link rel="icon" href="/images/dilla-picture.png" />
    </Head>

    <main className={`${styles.main} lg:mx-20 sm:mx-10 xs:mx-2`}>
      <div className='mt-12 lg:mx-20 sm:mx-4'>
        <div className='text-center'>
          <p className='text-xl font-[400] uppercase tracking-widest'>The Official</p><h1 className={`${styles.title} font-[600]`}>J Dilla Legacy Collection</h1>
        </div>
        <div className={`${styles.description} text-center font-[400]`}>
          {`The J Dilla Legacy Collection is a web3 digital collection that creates a new way to experience the musical impact of J Dilla. It includes some of the most iconic artwork made by renowned artist Desiree Kelly, exclusive physical collectors items, and interactive music collectibles that cannot be found anywhere else. All of this will lead to an ultimate music Block Party experience in the metaverse. The collection is designed to give fans a glimpse into the life and work of one of hip-hop's most influential artists curated through the eyes of the person who knew him best - his mother, Ma Dukes.`}
        </div>
      </div>

      <div className='flex flex-wrap lg:justify-between gap-8 justify-center mt-10'>
        <div className='text-center space-y-3 w-80'>
        <p className='tracking-widest text-3xl font-[600] pb-2'>J Dilla Anthology</p>
          <div className='h-80 relative'>
            <div style={{ height: "100%", width: "100%" }}>
              <Image className="rounded-lg" src="/images/crosswords.png" object-fit="contain" fill alt={'crosswords'} />
            </div>
          </div>
          <MintButton chainId={CHAINID} contractAddress={ANTHOLOGY} price={0.05} setQuantity={setAnthologyQuantity} quantity={anthologyQuantity} openseaLink={anthologyLink} state={anthologyCC} clientId={process.env.NEXT_PUBLIC_JDILLA_ANTHOLOGY_CLIENTID} />
          <Toggle state={anthologyCC} setState={setAnthologyCC} />
          <div className='space-y-1 w-full p-2 border border-white rounded-md'>
            <p>Price: 0.05 ETH</p>
            <p>Minted: {anthologyMints}/77</p>
          </div>
          <div className='text-left'>
            <li>1x Sneaker Contest Entry</li>
          </div>
        </div>

        <div className='text-center space-y-3 w-80'>
          <p className='tracking-widest text-3xl font-[600] pb-2'>Ruff Draft</p>
          <div className='h-80 relative'>
            <div style={{ height: "100%", width: "100%" }}>
              <Image className="rounded-lg" src="/images/dilla-picture.png" object-fit="contain" fill alt={'dilla'} />
            </div>
          </div>
          <MintButton chainId={CHAINID} contractAddress={RUFFDRAFT} price={0.2} setQuantity={setRuffDraftQuantity} quantity={ruffDraftQuantity} openseaLink={ruffDraftLink} state={ruffdraftCC} clientId={process.env.NEXT_PUBLIC_RUFF_DRAFT_CLIENTID} />
          <Toggle state={ruffdraftCC} setState={setRuffdraftCC} />
          <div className='space-y-1 w-full p-2 border border-white rounded-md'>
            <p>Price: 0.2 ETH</p>
            <p>Minted: {ruffdraftMints}/33</p> 
          </div>
          <div className='text-left'>
            <li>4x Sneaker Contest Entry</li>
            <li>Shipped poster included and authenticated on chain via QR Code</li>
          </div>
        </div>

        <div className='text-center space-y-3 w-80'>
          <p className='tracking-widest text-3xl font-[600] pb-2'>Ma Dukes Says</p>
          <div className='h-80 relative'>
            <div style={{ height: "100%", width: "100%" }}>
            <Image className="rounded-md" src="/images/animation.gif" object-fit="contain" fill alt={'animation'} />
            </div>
          </div>
          <MintButton chainId={CHAINID} contractAddress={MADUKES} price={0.3} setQuantity={setMaDukesQuantity} quantity={maDukesQuantity} openseaLink={maDukesLink} setShowTypeform={setShowTypeform} state={madukesCC} clientId={process.env.NEXT_PUBLIC_MADUKES_CLIENTID} />
          <Toggle state={madukesCC} setState={setMadukesCC} />
          <div className='space-y-1 w-full p-2 border border-white rounded-md text-center'>
            <p>Price: 0.3 ETH</p>
            <p>Minted: {madukesMints}/12</p> 
          </div>
          <div className='text-left'>
            <li>6x Sneaker Contest Entry</li>
            <li>Shipped poster included and authenticated on chain via QR Code</li>
            <li>Hidden audio message recorded by Ma Dukes</li>
          </div>
        </div>
      </div>

      {showTypeForm &&
      <div className='h-full w-full lg:mt-12 mt-8 flex justify-center'>
        <Typeform />
      </div>
      }
    </main>

    <footer className='py-8 border-t border-white text-white justify-center flex items-center'>
     <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
     <Link href="http://decent.xyz/" className='pt-1'>
        <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
      </Link>
    </footer>
  </div>
  );
};

export default Home;
