import '../styles/global.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import { defaultApiService } from '../lib/services/api-service';
import { defaultCEPService } from "../lib/services/cep-service";
import { debugUserService, UserService } from "../lib/services/user-service";

export const ApiServiceContext = React.createContext(defaultApiService);
export const CEPServiceContext = React.createContext(defaultCEPService);
export const UserServiceContext = React.createContext(debugUserService);

function MyApp({ Component, pageProps }: AppProps) {
  const [userService, setUserService] = React.useState<UserService>({
    loadUser: () => null,
    saveUser: () => {},
  });

  React.useEffect(() => {
    setUserService(debugUserService);
  }, []);

  return (
    <UserServiceContext.Provider value={userService}>
      <Component {...pageProps} />
    </UserServiceContext.Provider>
  );
}

export default MyApp;
