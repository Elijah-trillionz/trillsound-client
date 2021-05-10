import React, { useEffect } from 'react';

export const SearchResults = ({ searchResults, searchQuery }) => {
  useEffect(() => {
    document.querySelector('html').scrollTop = 0;
  }, []);

  const searchResultsElement = searchResults.map((searchResult, index) => {
    return (
      <li className='song-container' key={index} style={{ height: '350px' }}>
        {/* <div
          className='img'
          style={{
            backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
          }}
        ></div> */}
        <div className='song-title'>
          <h3>
            <a href='/js'>{searchResult}</a>
          </h3>
        </div>
      </li>
    );
  });

  return (
    <>
      <h2 className='page-title'>Search results for {searchQuery}</h2>
      <ul className='songs-container'>{searchResultsElement}</ul>
    </>
  );
};
