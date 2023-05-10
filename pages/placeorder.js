import CheckoutWizard from '@/components/CheckoutWizard';
import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const shipPrice = itemsPrice > 1000000 ? 0 : 25000;
  const totalPrice = itemsPrice + shipPrice;

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shipPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };

  return (
    <>
      <Title title='Hoàn thành đặt hàng' />
      <CheckoutWizard activeStep={3} />
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
        <div className='grid md:grid-cols-3 md:gap-5'>
          <div className='overflow-x-auto md:col-span-2'>
            <div className='cardPlaceOrder p-5'>
              <h2 className='mb-2 text-lg font-semibold'>Địa chỉ giao hàng</h2>
              <div className='flexRow items-center justify-between gap-2'>
                <div>
                  <span className='italic'>{shippingAddress.fullName}</span>
                  {' - '}
                  {shippingAddress.street}, {shippingAddress.town},{' '}
                  {shippingAddress.district}, {shippingAddress.city}
                </div>
                <div>
                  <Link href='/shipping'>
                    <AiOutlineEdit size={30} />
                  </Link>
                </div>
              </div>
            </div>

            <div className='cardPlaceOrder p-5'>
              <h2 className='mb-2 text-lg font-semibold'>
                Phương thức thanh toán
              </h2>
              <div className='flexRow items-center justify-between gap-2'>
                <div className='italic'>{paymentMethod}</div>
                <div>
                  <Link href='/payment'>
                    <AiOutlineEdit size={30} />
                  </Link>
                </div>
              </div>
            </div>

            <div className='cardPlaceOrder p-5'>
              <h2 className='mb-2 text-lg font-semibold'>Sản phẩm đặt hàng</h2>
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
                              <div className='text-sm font-normal underline'>
                                đ
                              </div>
                              {VND.format(item.price).slice(
                                0,
                                VND.format(item.price).length - 1
                              )}
                            </div>
                          </td>

                          <td className='p-5'>{item.quantity}</td>
                          <td className='p-5'>
                            <div className='fjcic text-red-500'>
                              <div className='text-sm font-normal underline'>
                                đ
                              </div>
                              {VND.format(item.price * item.quantity).slice(
                                0,
                                VND.format(item.price * item.quantity).length -
                                  1
                              )}
                            </div>
                          </td>
                          <td className='p-5'>
                            <Link href='/cart'>
                              <button>
                                <AiOutlineEdit size={30} />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=''>
            <ul className='checkOutContainer bg-white p-5'>
              <li>
                <div className='text-xl font-semibold mb-2 flex justify-between'>
                  Thanh Toán
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div className=''>Thành tiền</div>
                  <div className='font-semibold text-lg text-red-700'>
                    {VND.format(itemsPrice)}
                  </div>
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Phí vận chuyển</div>
                  <div className='font-semibold text-lg text-red-700'>
                    {VND.format(shipPrice)}
                  </div>
                </div>
              </li>
              <li>
                <div className='mb-2 flex justify-between'>
                  <div>Tổng số tiền</div>
                  <div className='font-semibold text-lg text-red-700'>
                    {VND.format(totalPrice)}
                  </div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  className='btnCheckOut w-full mt-5'
                  onClick={placeOrderHandler}
                >
                  {loading ? 'Xin chờ ít phút...' : 'Đặt hàng'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });

PlaceOrderScreen.auth = true;
