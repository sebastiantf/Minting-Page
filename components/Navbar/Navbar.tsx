import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import { usePrivy } from '@privy-io/react-auth';

interface NavItemProps {
  href: string;
  children: string | JSX.Element;
  openInNewTab?: boolean;
}

const ConnectButton = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const truncate = (text: string) => {
    return text.substring(0, 4) + '...' + text.substring(text.length - 4);
  }

  if (!ready) {
    return null;
  }

  return(
    <>
    {authenticated && user?.wallet ? 
      <button
        className='bg-violet-700 text-white px-5 py-1 rounded-full font-[500]'
        disabled
      >
        {truncate(user.wallet.address)}
      </button> :
      <button
        onClick={login}
        className='bg-violet-700 text-white hover:bg-white hover:text-violet-700 px-5 py-1 rounded-full font-[500]'
      >
        Connect
      </button>
    }
    </>
  )
}

const Navbar = () => {

  function NavItem({ href, openInNewTab, children }: NavItemProps): JSX.Element {
    return (
      <Link passHref href={href} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noreferrer" : undefined}>
        <p
          className={`uppercase tracking-widest font-[500] text-base hover:text-black text-white p-2`}
        >
          {children}
        </p>
      </Link>
    );
  }

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center`} >
        <NavItem href="http://decent.xyz/" openInNewTab><Image width={100} height={40} src="/images/decent.png" alt="decent" /></NavItem>  
        <ConnectButton />
      </nav>
    </>

  );
};

export default Navbar;