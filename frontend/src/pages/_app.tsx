import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }: AppProps) {
  return (
  <Layout>
     <Toaster position="top-right" />
    <Component {...pageProps} /></Layout>
    );
}
