import data from '@/utils/data';
import ProductItem from '@/components/ProductItem';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Title from '@/components/Title';
import db from '@/utils/db';
import Product from '@/models/Product';
import Image from 'next/image';

export default function Home({ products, featuredProducts }) {
  return (
    <>
      <Title title='Trang chủ' />
      <div
        className='relative text-white text-[20px] w-full max-w-[1360px] 
      mx-auto overflow-hidden cursor-pointer'
      >
        <Carousel autoPlay={true} infiniteLoop={true}>
          {featuredProducts.map((product) => (
            <div key={product.slug}>
              <img
                src={product.banner}
                alt={product.name}
                className='aspect-[1.7] md:aspect-auto object-cover'
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='mb-5 font-semibold text-2xl'>Sản phẩm nổi bật</div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
