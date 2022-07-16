import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface MainLayoutProps {}

const MainLayout = ({}: MainLayoutProps) => {
  return (
    <>
      <Header />

      {/* This element will render either <DashboardMessages> when the URL is
  "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
*/}
      <Outlet />
    </>
  );
};

export default MainLayout;
