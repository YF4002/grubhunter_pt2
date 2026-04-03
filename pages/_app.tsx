import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import '@/app/globals.css';
import '@/styles/layout.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}