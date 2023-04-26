import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import Title from './Title';
import { Store } from '@/utils/Store';

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Title title='Trang chủ' />

      <div className='flex flex-col min-h-screen justify-between bg-gray'>
        <header className='w-full fixed z-10 bg-white'>
          <nav className='flex h-20 justify-between items-center shadow-md px-7'>
            <Link href='/' className='text-4xl font-bold'>
              T1.FIT
            </Link>
            <div className='flex items-center gap-5 text-xl'>
              <Link href='/login'>Đăng nhập</Link>
              <Link href='/cart'>
                <div className='iconCart'>
                  <BsCart className='text-[24px] md:text-[30px]' />
                  {cartItemsCount > 0 && (
                    <span className='quantityInCart'>{cartItemsCount}</span>
                  )}
                </div>
              </Link>
            </div>
          </nav>
        </header>

        <main className='container m-auto mt-24 lg:px-20 px-3'>{children}</main>

        <footer className='flex h-60 bg-slate-700 justify-center items-center text-cyan-50'>
          footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
