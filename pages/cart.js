import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const CartScreen = () => {
  const router = useRouter();
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <>
      <Title title='Giỏ hàng của bạn' />
      <div className='text-4xl mb-5'>T1 | Giỏ Hàng</div>
      {cartItems.length === 0 ? (
        <div className='flexCol fjcic font-semibold text-2xl bg-white p-5 text-center'>
          <div className='mb-5'>
            <div>Bạn chưa có sản phẩm nào trong giỏ hàng</div>
            <div>
              Vui lòng quay lại gian hàng để tiếp tục mua hàng mua hàng!
            </div>
          </div>
          <Link href='/'>
            <button className='btnAddToCart'>Tiếp tục mua hàng</button>
          </Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3 bg-white p-5'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='pt-5 flex justify-start'>Sản phẩm</th>
                  <th className='p-5'>Đơn giá</th>
                  <th className='p-5'>Số lượng</th>
                  <th className='p-5'>Tổng tiền</th>
                  <th className='p-5'>Thao tác</th>
                </tr>
              </thead>

              <tbody className='text-center'>
                {cartItems.map((item) => {
                  let [count, setCount] = useState(item.quantity);
                  return (
                    <tr key={item.slug} className='border-b'>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              marginRight: 10,
                            }}
                          />
                          {item.name}
                        </Link>
                      </td>
                      <td className='p-5'>
                        <div className='fjcic'>
                          <div className='text-sm font-normal underline'>đ</div>
                          {VND.format(item.price).slice(
                            0,
                            VND.format(item.price).length - 1
                          )}
                        </div>
                      </td>
                      {/* <td className='p-5'>{item.quantity}</td> */}

                      <td className='p-5'>
                        <div className='flexRow justify-center items-center'>
                          <button
                            className='btnCounter'
                            onClick={() => {
                              setCount(count - 1), (item.quantity = count - 1);
                            }}
                          >
                            -
                          </button>
                          <h1>{count}</h1>
                          <button
                            className='btnCounter'
                            onClick={() => {
                              setCount(count + 1), (item.quantity = count + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className='p-5'>
                        <div className='fjcic text-red-500'>
                          <div className='text-sm font-normal underline'>đ</div>
                          {VND.format(item.price * item.quantity).slice(
                            0,
                            VND.format(item.price * item.quantity).length - 1
                          )}
                        </div>
                      </td>
                      <td className='p-5 text-right fjcic'>
                        <button onClick={() => removeItemHandler(item)}>
                          <RiDeleteBin6Line className='cursor-pointer text-black/[0.5] hover:text-black lg:text-2xl' />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between card p-5 bg-white'>
            <div className=' font-semibold'>
              Thanh toán ({cartItems.reduce((a, c) => a + c.quantity, 0)}):{' '}
              <span className='font-semibold text-lg text-red-700'>
                {VND.format(
                  cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                ).slice(
                  0,
                  VND.format(
                    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                  ).length - 1
                )}
                VNĐ
              </span>
            </div>
            <div className='mt-5'>
              <button
                className='btnCheckOut w-full'
                onClick={() => router.push('/shipping')}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(CartScreen, { ssr: false }));
