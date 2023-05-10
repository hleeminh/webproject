import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    // const { data } = await axios.get(`/api/products/${item._id}`);
    const res = await fetch(`/api/products/${item._id}`);
    const data = await res.json();
    console.log(data.countInStock);

    if (data.countInStock < quantity) {
      return toast.error('Xin lỗi, sản phẩm này tạm hết hàng!');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Cập nhật giỏ hàng thành công!');
  };

  const router = useRouter();

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <>
      <Title title='Giỏ hàng của bạn' />
      <div className='text-4xl mb-5'>T1 | Giỏ Hàng</div>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center font-semibold text-2xl bg-white p-5 text-center'>
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
        <div className='grid md:grid-cols-4 md:gap-5 gap-3 mb-7'>
          <div className='overflow-x-auto md:col-span-3 bg-white p-5'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr className=''>
                  <th className='p-5'>Sản phẩm</th>
                  <th className='p-5'>Đơn giá</th>
                  <th className='p-5 '>Số lượng</th>
                  <th className='p-5'>Tổng tiền</th>
                  <th className='p-5'>Thao tác</th>
                </tr>
              </thead>

              <tbody className='text-center'>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.slug} className='border-b'>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flexCol items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              marginRight: 10,
                              marginBottom: 10,
                              marginTop: 10,
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

                      <td className='p-5'>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                          className='p-0 '
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
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
                      <td className='p-5'>
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
          <div className=''>
            <ul className='checkOutContainer bg-white p-5'>
              <li>
                <div className='font-semibold'>
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
              </li>
              <li>
                <button
                  className='btnCheckOut w-full mt-5'
                  onClick={() => router.push('login?redirect=/shipping')}
                >
                  Mua hàng
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
