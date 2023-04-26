import Layout from '@/components/Layout';
import data from '@/utils/data';
import ProductItem from '@/components/ProductItem';

export default function Home() {
  return (
    // <Layout title="Home Page">
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
      {data.products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
    // </Layout>
  );
}
