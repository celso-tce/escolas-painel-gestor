import '../styles/global.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import { defaultApiService } from '../lib/services/api-service';
import { defaultCEPService } from "../lib/services/cep-service";

export const ApiServiceContext = React.createContext(defaultApiService);
export const CEPServiceContext = React.createContext(defaultCEPService);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
