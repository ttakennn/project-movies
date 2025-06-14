import './Layout.scss';

import Header from '../Header/Header';
import type { ReactNode } from 'react';
import Search from '../Search/Search';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Header />
      <Search />
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout; 