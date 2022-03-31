import {useEffect, useState} from 'react';
import { Link } from '@shopify/hydrogen/client';


import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({ collections, storeName, fromHome }) {
  
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const { isCartOpen } = useCartUI();
  
  const [scrolled, setScrolled] = useState(false)

    const scrollableNav = () => {
        if (window?.scrollY > 50) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }
  
  useEffect(() => {
        window?.addEventListener('scroll', scrollableNav)

        return () => {
            window?.removeEventListener('scroll', scrollableNav)
        }
    }, [])


  useEffect(() => {
    const scrollbarWidth = document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);
  return (
    <header className={`h-[4rem] lg:h-20" role="banner`}>
      <div className={` border-b-${fromHome && scrolled ? '2'  : !fromHome ? '2' : '0' } border-gray-500 transition-all duration-500 fixed w-full z-20 h-[3rem] lg:h-[3.5rem] bg-${fromHome && scrolled ? 'white' : !fromHome ? 'white' : 'inherit'} text-${fromHome && scrolled ? 'black' : !fromHome ? 'black' : 'white'} flex justify-between items-center pr-8 pl-8`}>
        <MobileNavigation
            collections={collections}
            isOpen={isMobileNavOpen}
            setIsOpen={setIsMobileNavOpen}
            fromHome={fromHome}
            scrolled={scrolled}
          />
        <div className='flex h-full items-center'>
          <Link
              className={`transition-all duration-500 text-${fromHome && scrolled ? 'black' : !fromHome ? 'black' : 'white'} md:pr-[30px] uppercase text-2xl tracking-widest font-bold`}
              to="/"
            >
              BUGATCHI
          </Link>
          <Navigation collections={collections} storeName={storeName} />
        </div>
        <div className='flex h-full items-center'>
          {/* <CountrySelector /> */}
          <CartToggle
              handleClick={() => {
              if (isMobileNavOpen) setIsMobileNavOpen(false);
            }}
            fromHome={fromHome}
            scrolled={scrolled}
            scrollbarWidth={scrollbarWidth}
          />
        </div>
      </div>
    </header>
  );
}
