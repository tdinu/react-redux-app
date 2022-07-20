import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='app-bar'>
      <nav className='nav-bar'>
        <ul className='nav-menu'>
          <li>
            <NavLink to='/' className='nav-item'>
              Showbucket App
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='favorites' className='nav-item'>
              Favorites
            </NavLink>
        </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
