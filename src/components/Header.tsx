import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  

  return (
    <header className='app-bar'>
      <nav className='nav-bar'>
        <ul className='nav-menu'>
          <li>
            <NavLink
              to='/'
              className='nav-item'
              // style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='favorites' className='nav-item'>
              Favorites
            </NavLink>
        </li> */}
        </ul>
        {/* <div className='nav-search'>
          <form onSubmit={onSubmit}>
            <input
              type='search'
              placeholder='Search'
              value={query}
              onChange={handleOnChange}
            />
            <button type='submit'>Search</button>
          </form>
      </div> */}
      </nav>
    </header>
  );
};

export default Header;
