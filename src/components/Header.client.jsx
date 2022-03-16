import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-[4rem] lg:h-20" role="banner">
      <div className={'fixed w-full z-20 h-[4rem] lg:h-20 bg-white border-b-2 flex justify-between items-center pr-8 pl-8'}>
        <MobileNavigation
            collections={collections}
            isOpen={isMobileNavOpen}
            setIsOpen={setIsMobileNavOpen}
          />
        <div className='flex h-full items-center'>
          <Link
              className="font-black text-black uppercase text-2xl tracking-widest"
              to="/"
            >
              {storeName}
          </Link>
          <Navigation collections={collections} storeName={storeName} />
        </div>
        <div className='flex h-full items-center'>
          <CountrySelector />
          <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
          />
        </div>
      </div>
    </header>
  );
}
