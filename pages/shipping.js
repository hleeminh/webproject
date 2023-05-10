import CheckoutWizard from '@/components/CheckoutWizard';
import Title from '@/components/Title';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronRight } from 'react-icons/fi';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('street', shippingAddress.street);
    setValue('town', shippingAddress.town);
    setValue('district', shippingAddress.district);
    setValue('city', shippingAddress.city);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, street, town, district, city }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, street, town, district, city },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          street,
          town,
          district,
          city,
        },
      })
    );
    router.push('/payment');
  };
  return (
    <>
      <Title title='Địa chỉ' />
      <CheckoutWizard activeStep={1} />
      <form
        className='flexCol mx-auto max-w-lg '
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='mb-5'>
          <label htmlFor='fullName'>Họ và tên</label>
          <input
            type='text'
            className='w-full'
            id='fullName'
            placeholder='Họ và tên'
            autoFocus
            {...register('fullName', {
              required: 'Vui lòng nhập đầy đủ họ tên của bạn',
            })}
          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName.message}</div>
          )}
        </div>
        <div className='mb-5'>
          <label htmlFor='street'>Số nhà/ngách/ngõ/thôn...</label>
          <input
            type='text'
            className='w-full'
            id='street'
            placeholder='Địa chỉ cụ thể'
            autoFocus
            {...register('street', {
              required: 'Vui lòng địa chỉ cụ thể',
            })}
          />
          {errors.street && (
            <div className='text-red-500'>{errors.street.message}</div>
          )}
        </div>
        <div className='mb-5'>
          <label htmlFor='town'>Phường/xã</label>
          <input
            type='text'
            className='w-full'
            id='town'
            placeholder='Phường/xã'
            autoFocus
            {...register('town', {
              required: 'Vui lòng phường/xã',
            })}
          />
          {errors.town && (
            <div className='text-red-500'>{errors.town.message}</div>
          )}
        </div>
        <div className='mb-5'>
          <label htmlFor='district'>Quận/huyện</label>
          <input
            type='text'
            className='w-full'
            id='district'
            placeholder='Quận/huyện'
            autoFocus
            {...register('district', {
              required: 'Vui lòng Quận/huyện',
            })}
          />
          {errors.district && (
            <div className='text-red-500'>{errors.district.message}</div>
          )}
        </div>
        <div className='mb-5'>
          <label htmlFor='city'>Tỉnh/thành phố</label>
          <input
            type='text'
            className='w-full'
            id='city'
            placeholder='Tỉnh/thành phố'
            autoFocus
            {...register('city', {
              required: 'Vui lòng nhập Tỉnh/thành phố',
            })}
          />
          {errors.city && (
            <div className='text-red-500'>{errors.city.message}</div>
          )}
        </div>
        <div className='flex mb-5 justify-end '>
          <button className='next-button flex flex-row items-center'>
            Tiếp theo
            <FiChevronRight size={30} className='' />
          </button>
        </div>
      </form>
    </>
  );
}

ShippingScreen.auth = true;
