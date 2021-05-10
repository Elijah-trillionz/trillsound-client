import React from 'react';

export const SortMenu = ({ genre }) => {
  const toggleSortModal = () => {
    document.querySelector('.sort-menu').classList.toggle('active');
  };

  return (
    <div className='sort-menu'>
      <div className='sort-icon' onClick={toggleSortModal}>
        <div className='cont'>
          <div className='sort-line'></div>
          <div className='sort-line'></div>
          <div className='sort-line'></div>
        </div>
      </div>
      <div className='sort-content'>
        <p>
          <a href={`/genre/${genre}/trending#trending`}>
            <span>Trending</span>
            <i className='fab fa-facebook'></i>
          </a>
        </p>
        <p>
          <a href={`/genre/${genre}/alph#alphabetically`}>
            <span>Alphabetical Order</span>
            <i className='fab fa-twitter'></i>
          </a>
        </p>
        <p>
          <a href={`/genre/${genre}`}>
            <span>Recently Uploaded</span>
            <i className='fab fa-google'></i>
          </a>
        </p>
      </div>
    </div>
  );
};
