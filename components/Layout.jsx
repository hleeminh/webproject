import React, { Fragment, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai';
import Title from './Title';
import { Store } from '@/utils/Store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
// import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [displayPersonal, setDisplayPersonal] = useState('hidden');
  const [displayMobileMenu, setDisplayMobileMenu] = useState('hidden');
  const [iconOpen, setIconOpen] = useState('block');
  const [iconClose, setIconClose] = useState('hidden');

  const [query, setQuery] = useState('');
  const router = useRouter();

  const searchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const [showIcon, setShowIcon] = useState('block');

  return (
    <>
      <ToastContainer position='bottom-center' limit={1} />

      <div className='flex flex-col min-h-screen justify-between bg-gray'>
        <header className='w-full fixed z-10 bg-white mb-2'>
          <nav className='flex h-20 justify-between items-center shadow-md px-7'>
            <Link href='/' className='text-4xl font-bold'>
              T1.FIT
            </Link>
            <form
              onSubmit={searchHandler}
              className='mx-auto md:flex justify-center hidden'
              onMouseEnter={() => setShowIcon('hidden')}
              onMouseLeave={() => setShowIcon('block')}
            >
              <div className='flexRow justify-center items-center relative'>
                <div className='absolute left-1'>
                  <BiSearch size={30} color='grey' className={`${showIcon}`} />
                </div>
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type='text'
                  className={`outline-0 border-gray-300 border-2 lg:w-[500px] md:w-[250px] ${
                    showIcon == 'block' ? 'pl-9' : 'pl-2'
                  }  `}
                  placeholder='Sản phẩm, thương hiệu...'
                />
                <button type='submit' className='ml-1 search-button h-full'>
                  Tìm kiếm
                </button>
              </div>
            </form>
            <div className='md:flex hidden items-center gap-4 text-xl'>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <div
                  className='relative inline-block'
                  onMouseLeave={() => setDisplayPersonal('hidden')}
                >
                  <ul
                    className='cursor-pointer'
                    onMouseEnter={() => setDisplayPersonal('block')}
                  >
                    Xin chào{' '}
                    <span className='text-red-500 font-semibold'>
                      {session.user.name}
                    </span>{' '}
                    !
                  </ul>
                  <ul
                    className={`${displayPersonal} absolute right-0 w-56 origin-top-right bg-white shadow-lg drop-animation`}
                    onMouseLeave={() => setDisplayPersonal('hidden')}
                  >
                    <li>
                      <DropdownLink className='dropdown-link' href='/profile'>
                        Hồ sơ cá nhân
                      </DropdownLink>
                    </li>
                    <li>
                      <DropdownLink
                        className='dropdown-link'
                        href='/order-history'
                      >
                        Lịch sử đơn hàng
                      </DropdownLink>
                    </li>
                    {session.user.isAdmin == true && (
                      <li>
                        <DropdownLink
                          className='dropdown-link'
                          href='/admin/dashboard'
                        >
                          Kho hàng
                        </DropdownLink>
                      </li>
                    )}
                    <li>
                      <a
                        className='dropdown-link'
                        href='#'
                        onClick={logoutClickHandler}
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href='/login' className='p-2 letspace0'>
                  Đăng nhập
                </Link>
              )}
              <Link href='/cart'>
                <div className='iconCart'>
                  <BsCart className='text-[24px] md:text-[30px]' />
                  {cartItemsCount > 0 && (
                    <span className='quantityInCart'>{cartItemsCount}</span>
                  )}
                </div>
              </Link>
            </div>
            <div
              className={`cursor-pointer md:hidden ${iconOpen} `}
              onClick={() => {
                setDisplayMobileMenu('block'),
                  setIconClose('block'),
                  setIconOpen('hidden');
              }}
            >
              <AiOutlineMenu className='text-[24px] md:text-[30px]' />
            </div>
            <div
              className={`cursor-pointer md:hidden ${iconClose} `}
              onClick={() => {
                setDisplayMobileMenu('hidden'),
                  setIconClose('hidden'),
                  setIconOpen('block');
              }}
            >
              <AiOutlineCloseCircle className='text-[24px] md:text-[30px]' />
            </div>
          </nav>

          {/* MENU MOBILE */}
          <div
            className={`grid ${displayMobileMenu} md:hidden items-center gap-5 p-5 shadow-lg drop-animation`}
          >
            <form
              onSubmit={searchHandler}
              className='flex relative'
              onMouseEnter={() => setShowIcon('hidden')}
              onMouseLeave={() => setShowIcon('block')}
            >
              <div className='flexRow justify-center items-center '>
                <div className='absolute left-1'>
                  <BiSearch size={30} color='gray' className={`${showIcon}`} />
                </div>
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type='text'
                  className={`flex outline-0 border-gray-300 border-2 ${
                    showIcon == 'block' ? 'pl-9' : 'pl-2'
                  }  `}
                  placeholder='Sản phẩm, thương hiệu...'
                />
                <button
                  type='submit'
                  className='ml-1 primary-button h-full text-sm absolute right-0'
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
            <div className='flex justify-between gap-5 text-xl'>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <div
                  className='relative inline-block'
                  onMouseLeave={() => setDisplayPersonal('hidden')}
                >
                  <ul
                    className='cursor-pointer'
                    onMouseEnter={() => setDisplayPersonal('block')}
                  >
                    Xin chào{' '}
                    <span className='text-red-500 font-semibold'>
                      {session.user.name}
                    </span>{' '}
                    !
                  </ul>
                  <ul
                    className={`${displayPersonal} absolute left-0 w-56 origin-top-right bg-white shadow-lg drop-animation`}
                    onMouseLeave={() => setDisplayPersonal('hidden')}
                  >
                    <li>
                      <DropdownLink className='dropdown-link' href='/profile'>
                        Hồ sơ cá nhân
                      </DropdownLink>
                    </li>
                    <li>
                      <DropdownLink
                        className='dropdown-link'
                        href='/order-history'
                      >
                        Lịch sử đơn hàng
                      </DropdownLink>
                    </li>
                    {session.user.isAdmin == true && (
                      <li>
                        <DropdownLink
                          className='dropdown-link'
                          href='/admin/dashboard'
                        >
                          Kho hàng
                        </DropdownLink>
                      </li>
                    )}
                    <li>
                      <a
                        className='dropdown-link'
                        href='#'
                        onClick={logoutClickHandler}
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href='/login' className='p-2 letspace0'>
                  Đăng nhập
                </Link>
              )}
              <Link href='/cart'>
                <div className='iconCart'>
                  <BsCart className='text-[24px] md:text-[30px]' />
                  {cartItemsCount > 0 && (
                    <span className='quantityInCart'>{cartItemsCount}</span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className='container m-auto mt-28 mb-8 lg:px-20 px-3'>
          {children}
        </main>

        <footer className='flex h-60 bg-slate-700 justify-center items-center text-cyan-50'>
          footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
