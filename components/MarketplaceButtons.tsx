import Image from "next/image";
import Link from "next/link";

const MarketplaceButtons = (props:any) => {

  return ( 
    <Link href={`https://opensea.io/collection/${props.openseaLink}`} target="_blank" rel="noreferrer">
    <Image src="/images/opensea.png" height={48} width={48} alt="opensea"/></Link>
  )
}

export default MarketplaceButtons;