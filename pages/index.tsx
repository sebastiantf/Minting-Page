import type { NextPage } from 'next';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MarketplaceButtons from '../components/MarketplaceButtons';
import { getReleaseDetails } from '../lib/getReleaseDetails';
import getIpfsLink from "../lib/getIpfsLink";
import CountdownText from '../components/CountdownText';
import { useAccount, useSigner } from 'wagmi';
import Box from '../components/Box';

const Home: NextPage = (props: any) => {
  console.log("TEST", props.contractData)
  const blurRef = useRef<HTMLDivElement | null>(null);
  const endDate = new Date(props.contractData.data.saleEnd * 1000);
  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(() => blurRef.current && (blurRef.current.style.display = "block"))
  }, []);

  const paragraphs = props.contractData.metadata.description.split('\n\n');
  const renderedParagraphs = paragraphs.map((paragraph: string, index: number) => (
    <p className='py-2' key={index}>{paragraph}</p>
  ));

  return <>
    <Head>
      <title>{props.contractData.data.name}</title>
      <meta
        name="description"
        content={props.contractData.metadata.description}
      />
      <link rel="icon" href={getIpfsLink(props.contractData.metadata.image)} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://featured.decent.xyz/"} />
      <meta property='og:image' content={getIpfsLink(props.contractData.metadata.image)} />
      <meta property='og:title' content={props.contractData.data.name} />
      <meta property='og:description' content={props.contractData.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://featured.decent.xyz/"} />
      <meta name='twitter:title' content={props.contractData.data.name} />
      <meta name='twitter:description' content={props.contractData.metadata.description} />
      <meta name='twitter:image' content={getIpfsLink(props.contractData.metadata.image)} />
    </Head>
    <main className={`${styles.main} md:mt-0 sm:mt-16 mt-28`}>
      <div className='w-full flex flex-wrap'>
        <div className='md:border-r border-black w-full md:w-2/5 relative md:h-[80vh] overflow-y-auto'>
          <h1 className='px-8 2xl:text-6xl md:text-7xl text-6xl flex-items-center text-[#FF0000] pb-4 pt-8 md:mb-0 mb-4'>{props.contractData.data.name}</h1>
          <div className='p-8'>
            {renderedParagraphs}
          </div>
          <div className='px-8 border-black border-t pt-8 md:inline-block w-full hidden pb-16'>
            <div className='w-full'> 
              <Box
                className='border rounded-xl p-4'
                walletAddress={account}
                signer={signer}
                chainId={props.contractData.chainId} 
                nftAddress={props.contractData.address} 
                price={props.contractData.data.tokenPrice} 
              />
            </div>
          </div>
        </div>

        <div className='md:w-3/5 collectionBannerFlex flex items-center'>
           {/* <video src="/images/charmverse-nft.mp4" autoPlay loop playsInline muted /> */}
           <Image src="/images/static-nft.png" fill alt={'nft'} />
          <div ref={blurRef} className="blurrer"></div>
          <div className='space-y-3'>
            {/* NEED TO UPDATE BASED ON YOUR MEDIA TYPE */}
            <div className='flex justify-center'>
              <div style={{ height: "85%", width: "85%" }}>
                <video className="drop-shadow-lg rounded-lg" src={getIpfsLink(props.contractData.metadata.animation_url)} autoPlay loop playsInline muted />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center my-12 md:hidden'>
          <Box
            className='border rounded-xl p-4'
            walletAddress={account}
            signer={signer}
            chainId={props.contractData.chainId} 
            nftAddress={props.contractData.address} 
            price={props.contractData.data.tokenPrice} 
          />
        </div>
      </div>
    </main>
    <footer className='md:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white relative gap-12'>
      <div className='flex gap-4'>
        <p>Claimed:</p>
        <p className='text-right text-[#FF0000]'>{props.contractData.data.totalSupply.toLocaleString()} | Open</p>
      </div>
      {/* indefinitely open = just comment out sale countdown */}
      {/* <div className='hidden sm:inline-block'>
        <MarketplaceButtons decentLink={"https://decent.xyz"} />
      </div>
      <div className='flex gap-4'>
        <p>Sale Ends:</p>
        <CountdownText className='text-[#FF0000] sm:w-40' dropTime={endDate} />
      </div> */}
    </footer>
  </>
};

export default Home;

export async function getStaticProps() {
  const CHAINID = 10;
  const CONTRACT_ADDRESS = '0xfd22bFE1bc51E21FD5E212680E22FA2503FEE6C8';
  let contractData = await getReleaseDetails(CHAINID, CONTRACT_ADDRESS)
  return {
    props: {
      contractData
    },
    revalidate: 20
  };
};