import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
