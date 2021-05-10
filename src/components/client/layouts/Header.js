import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';

export const Header = () => {
  const { searchForQuery } = useContext(GlobalContext);

  const [searchValue, setSearchValue] = useState('');

  // toggle search bar
  const toggleSearchBar = () => {
    document.querySelector('.search-input.desktop').classList.toggle('display');
    document.getElementById('search-desk').focus();
  };

  const searchQuery = (e) => {
    e.preventDefault();
    searchForQuery(searchValue);
  };
  return (
    <header className='desktop-header-container desktop-only'>
      <h1 className='title' onClick={() => console.log(searchValue)}>
        TrillSound.com♬
      </h1>
      <ul>
        <li className='contains-dropdown'>
          <div className='dropdown'>
            <p>
              Home
              <i className='fas fa-chevron-down icon'></i>
            </p>
            <div className='dropdown-content'>
              <ul>
                <li>
                  <a href='/#trending'>Trending</a>
                </li>
                <li>
                  <a href='/alph#alphabetical'>Alphabetical Order</a>
                </li>
                <li>
                  <a href='/new-uploads'>Recently Uploaded</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <a href='/s'>Best Songs</a>
        </li>
        <li className='contains-dropdown'>
          <div className='dropdown'>
            <p>
              Artists
              <i className='fas fa-chevron-down icon'></i>
            </p>
            <div className='dropdown-content'>
              <ul>
                <li>
                  <a href='/s'>All Stars</a>
                </li>
                <li>
                  <a href='/s'>Proto Stars</a>
                </li>
                <li>
                  <a href='/s'>Zonal Level</a>
                </li>
                <li>
                  <a href='/s'>Group Level</a>
                </li>
                <li>
                  <a href='/s'>Church Level</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <a href='/s'>Albums</a>
        </li>
        <li className='contains-dropdown'>
          <div className='dropdown'>
            <p>
              Genres
              <i className='fas fa-chevron-down icon'></i>
            </p>
            <div className='dropdown-content'>
              <ul>
                <li>
                  <a href='/genre/worship'>Worship</a>
                </li>
                <li>
                  <a href='/genre/praise'>Praise</a>
                </li>
                <li>
                  <a href='/genre/rap'>Rap</a>
                </li>
                <li>
                  <a href='/s'>More Music</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div className='search'>
        <i className='fas fa-search' onClick={toggleSearchBar}></i>
        <div className='search-input desktop'>
          <form onSubmit={searchQuery}>
            <input
              type='search'
              placeholder='Search and click enter'
              id='search-desk'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
};
