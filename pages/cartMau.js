import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import dynamic from 'next/dynamic';

const CartScreen = () => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
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
                {cartItems.map((item) => (
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
                    <td className='p-5'>{item.quantity}</td>
                    <td className='p-5'>
                      <div className='fjcic text-red-500'>
                        <div className='text-sm font-normal underline'>đ</div>
                        {VND.format(item.price).slice(
                          0,
                          VND.format(item.price).length - 1
                        )}
                      </div>
                    </td>
                    <td className='p-5 text-right fjcic'>
                      <RiDeleteBin6Line className='cursor-pointer text-black/[0.5] hover:text-black lg:text-2xl' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(CartScreen, { ssr: false }));
