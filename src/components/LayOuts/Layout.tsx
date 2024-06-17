import { FC, PropsWithChildren } from 'react';
import Header from './Header/Header';
import Head from './Head/Head';
import { twMerge } from 'tailwind-merge';

interface Props extends PropsWithChildren {}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
    <Head/>
    <div className="w-screen bg-transparent overflow-x-hidden !bg-gradient-to-b !from-primary ">
      <Header />
      <main className={twMerge("p-4 h-full min-h-full md:px-20 ",)}>{children}</main>
      {/* <Footer /> */}
    </div>
    </>
  );
};

export default Layout;
