import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product }) => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <Link href={`/product/${product.slug}`}>
      <div className='card'>
        <div className='flex md:h-[250px] relative'>
          <div className='fjcic absolute left-0 top-[20px] h-[20px] w-[80px] bg-orange-600 text-white text-sm'>
            Yêu thích
          </div>
          <div className='fjcic flex-col absolute right-0 top-0 h-[50px] w-[50px] bg-yellow-400 text-white'>
            GIẢM <span className='letspace0 text-red-600'>{product.sale}%</span>
          </div>
          <img
            src={product.image}
            alt={product.name}
            className='object-cover'
          />
          <div className='fjcic absolute left-0 bottom-0 h-[30px] w-[70px] bg-[#26aa99] text-white text-[12px] font-bold italic'>
            FREESHIP
          </div>
        </div>

        <div className='flex flex-col p-3 gap-2'>
          <div className='text-lg '>{product.name}</div>

          <div className='fjcic h-[20px] w-[80px] bg-orange-400 text-white text-center text-sm'>
            Giảm
            <div> </div>
            <span className='text-[12px] font-normal underline'>đ</span>
            {product.discount}k
          </div>

          <div className='flex flex-row justify-between '>
            <div className='flex flex-row items-center text-xl text-orange-700 font-semibold letspace0'>
              <div className='text-[12px] font-normal underline'>đ</div>
              {VND.format(product.price).slice(
                0,
                VND.format(product.price).length - 1
              )}
            </div>
            <div className='subtext flex items-end letspace0'>
              Đã bán {product.sold}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
