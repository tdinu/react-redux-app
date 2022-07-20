import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface MainLayoutProps {}

const MainLayout = ({}: MainLayoutProps) => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default MainLayout;
