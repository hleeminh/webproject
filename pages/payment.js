import CheckoutWizard from '@/components/CheckoutWizard';
import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const payments = ['Paypal', 'Stripe', 'Trả tiền mặt khi nhận hàng'];

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Vui lòng chọn phương thức thanh toán');
    }

    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.street) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.street]);

  return (
    <>
      <Title title='Phương thức thanh toán' />
      <CheckoutWizard activeStep={2} />
      <form className='mx-auto max-w-lg' onSubmit={submitHandler}>
        {payments.map((payment) => (
          <div key={payment} className='mb-4'>
            <input
              type='radio'
              name='paymentMethod'
              className='p-2 outline-none focus:ring-0'
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className='p-2'>
              {payment}
            </label>
          </div>
        ))}
        <div className='mb-5 flex justify-between'>
          <button
            className='back-button flex flex-row items-center'
            onClick={() => router.push('/shipping')}
            type='button'
          >
            <FiChevronLeft size={30} className='' />
            Trở lại
          </button>
          <button className='next-button flex flex-row items-center'>
            Tiếp theo
            <FiChevronRight size={30} className='' />
          </button>
        </div>
      </form>
    </>
  );
}

PaymentScreen.auth = true;
