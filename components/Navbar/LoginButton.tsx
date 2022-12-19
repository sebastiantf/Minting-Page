import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { usePrivy } from '@privy-io/react-auth';
import { BsDot } from "react-icons/bs";

const LoginButton = () => {
    const { ready, authenticated, user, login, logout } = usePrivy();

    const truncateEmail = (email: string) => {
        return email.length < 24 ? email : email.substring(0, 20) + '...';
    }

    const displayInfo = (address: string) => {
      return <>
         <div className='flex items-center'> 
           <BsDot className='text-green-500 text-3xl pt-1' />
          {user?.email?.address ? user?.email?.address : (user?.twitter?.username ? user?.twitter?.username : address.substring(0, 6) + '...' + address.substring(address.length - 4))}
          </div>
      </>
    }

    if (!ready) {
        return null;
    }

    return (
        <>
          {authenticated ?
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center text-white hover:text-gray-100 active:text-white tracking-widest cursor-pointer">
              {displayInfo(user?.wallet?.address as string)}
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-violet-700 ring-opacity-5 focus:outline-none">
              <div className="py-1">
              {user?.email ? 
                  <Menu.Item>
                    <p className='block px-4 py-2 text-sm'>
                      {truncateEmail(user?.email?.address as string)}
                    </p>
                  </Menu.Item> :
                  user?.google &&
                  <Menu.Item>
                    <p className='block px-4 py-2 text-sm'>
                      {user?.google?.email as string}
                    </p>
                  </Menu.Item>
                }
                {user?.twitter && 
                  <Menu.Item>
                    <p className='block px-4 py-2 text-sm'>
                        {user?.twitter?.username as string}
                    </p>
                  </Menu.Item>
                }
                {user?.wallet && 
                  <Menu.Item>
                    <p className='block px-4 py-2 text-sm'>
                      {user?.wallet?.address.substring(0, 6) + '...' + user?.wallet?.address.substring(user?.wallet?.address.length - 4)}
                    </p>
                  </Menu.Item>
                }
                <Menu.Item>
                  <p
                      className='block px-4 py-2 cursor-pointer text-sm active:text-violet-900 font-[500]'
                      onClick={logout}
                  >
                      Logout
                  </p>
                </Menu.Item>
              </div>
              </Menu.Items>
            </Transition>
          </Menu> :
          <button
            onClick={login}
            className='bg-white text-violet-700 hover:bg-white hover:bg-opacity-80 px-5 py-1 rounded-full font-[500]'
        >
            Connect Wallet
          </button>
        }
      </>
    )
}

export default LoginButton;