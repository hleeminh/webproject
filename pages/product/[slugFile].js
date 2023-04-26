import Layout from '@/components/Layout';
import React, { useContext, useEffect } from 'react';
import data from '@/utils/data';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Title from '@/components/Title';
import { Store } from '@/utils/Store';

const ProductScreen = () => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const { query } = useRouter();
  const { slugFile } = query;

  //   const product = data.products.filter((product) => product.slug === slug)[0];
  const product = data.products.find((product) => product.slug === slugFile);

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Xin lỗi, sản phẩm này tạm hết hàng');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  if (!product) {
    return (
      <div className='fjcic text-3xl mt-10'>
        <h1>Không tìm thấy sản phẩm này!</h1>
      </div>
    );
  }
  return (
    <>
      <Title title={product.name} />
      <div className='flex justify-center bg-white'>
        <div className='grid md:grid-cols-5 md:gap-3 p-4'>
          <div className='md:col-span-2'>
            <Image
              src={product.image}
              alt={product.name}
              width='640'
              height='640'
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='bg-cover'
            />
          </div>
          <div className='flexCol md:col-span-3 p-4 justify-between gap-4'>
            <div className='flexCol lg:gap-4 gap-2'>
              <div className='text-2xl font-bold'>{product.name}</div>
              <div className='flex lg:flex-row flex-col md:justify-between md:font-medium lg:gap-4 gap-2'>
                <div className='flexRow md:gap-5 lg:gap-4 gap-2'>
                  <div className='text-red-500 underline'>{product.rating}</div>
                  <div className='h-6 w-[2px] bg-gray-300'></div>
                  <div className='underline'>
                    {product.numReviews}{' '}
                    <span className='text-gray-500 '>Đánh giá</span>
                  </div>
                  <div className='h-6 w-[2px] bg-gray-300'></div>
                  <div className='underline'>
                    {product.sold} <span className='text-gray-500'>Đã bán</span>
                  </div>
                </div>
                {/* <div> */}
                {product.countInStock > 0 ? (
                  <div className='text-green-500'>Còn hàng</div>
                ) : (
                  <div className='text-red-500'>Tạm hết hàng</div>
                )}
                {/* </div> */}
              </div>
              <div className='flexRow items-center text-xl md:text-4xl text-orange-700 font-semibold letspace0 bg-gray-light p-4'>
                <div className='text-lg font-normal underline'>đ</div>
                {VND.format(product.price).slice(
                  0,
                  VND.format(product.price).length - 1
                )}
              </div>
            </div>
            <div>
              <button
                className='btnAddToCart w-full'
                onClick={addToCartHandler}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
